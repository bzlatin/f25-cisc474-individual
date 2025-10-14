import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Alert,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import type {
  AssignmentCreateIn,
  AssignmentOut,
  AssignmentUpdateIn,
} from '@repo/api';
import { fetchJSON } from '../lib/api';

type CreateFormState = {
  courseId: string;
  title: string;
  description: string;
  points: string;
  dueAt: string;
  latePolicy: string;
};

export const Route = createFileRoute('/assignments')({
  component: AssignmentsPage,
});

function AssignmentsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Stack spacing={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h1">
          Assignments
        </Typography>
        <Tooltip
          arrow
          enterDelay={200}
          leaveDelay={100}
          enterTouchDelay={0}
          title={showCreate ? 'Hide create form' : 'Add assignment'}
        >
          <IconToggleButton
            active={showCreate}
            onClick={() => {
              setEditingId(null);
              setShowCreate((prev) => !prev);
            }}
          />
        </Tooltip>
      </Stack>
      <Suspense fallback={<AssignmentsFallback />}>
        <AssignmentsContent
          showCreate={showCreate}
          onShowCreateChange={setShowCreate}
          editingId={editingId}
          onEditingChange={setEditingId}
        />
      </Suspense>
    </Stack>
  );
}

function AssignmentsContent({
  showCreate,
  onShowCreateChange,
  editingId,
  onEditingChange,
}: {
  showCreate: boolean;
  onShowCreateChange: Dispatch<SetStateAction<boolean>>;
  editingId: string | null;
  onEditingChange: Dispatch<SetStateAction<string | null>>;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: assignments = [] } = useSuspenseQuery({
    queryKey: ['assignments'],
    queryFn: () => fetchJSON<Array<AssignmentOut>>('/assignments'),
    staleTime: 60_000,
  });

  const [createForm, setCreateForm] = useState<CreateFormState>(() =>
    buildCreateForm(assignments),
  );
  const [editForm, setEditForm] = useState<CreateFormState>(() =>
    editingId
      ? buildEditForm(
          assignments.find((assignment) => assignment.id === editingId) ?? null,
        )
      : buildCreateForm(assignments),
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const editFormRef = useRef<HTMLDivElement | null>(null);

  // Initialize createForm.courseId once when data arrives
  useEffect(() => {
    if (!createForm.courseId && assignments[0]?.courseId) {
      setCreateForm((prev) => ({
        ...prev,
        courseId: assignments[0]!.courseId,
      }));
    }
  }, [assignments, createForm.courseId]);

  const editingAssignment = useMemo(
    () =>
      editingId
        ? (assignments.find((assignment) => assignment.id === editingId) ??
          null)
        : null,
    [assignments, editingId],
  );

  useEffect(() => {
    if (editingId && !editingAssignment) {
      onEditingChange(null);
      return;
    }
    if (!editingAssignment) return;
    setEditForm((prev) => {
      const next = buildEditForm(editingAssignment);
      return formsEqual(prev, next) ? prev : next;
    });
  }, [editingAssignment, editingId, onEditingChange]);

  const createMutation = useMutation({
    mutationFn: async (payload: AssignmentCreateIn) => {
      return fetchJSON<AssignmentOut>('/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (created) => {
      queryClient.setQueryData(
        ['assignments'],
        (previous: AssignmentOut[] | undefined) => {
          const others = (previous ?? []).filter(
            (assignment) => assignment.id !== created.id,
          );
          return [created, ...others];
        },
      );
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      setCreateForm((prev) => ({
        ...prev,
        title: '',
        description: '',
        points: prev.points,
        dueAt: '',
        latePolicy: '',
      }));
      onShowCreateChange(false);
    },
  });

  // Only reset when showCreate flips off (avoid depending on mutation identity)
  useEffect(() => {
    if (!showCreate) {
      createMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCreate]);

  const editMutation = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: AssignmentUpdateIn;
    }) =>
      fetchJSON<AssignmentOut>(`/assignments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        ['assignments'],
        (previous: AssignmentOut[] | undefined) =>
          (previous ?? []).map((assignment) =>
            assignment.id === updated.id ? updated : assignment,
          ),
      );
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      setEditForm(buildEditForm(updated));
      onEditingChange(null);
    },
  });

  // Only reset when the target being edited changes (avoid depending on mutation identity)
  useEffect(() => {
    editMutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingAssignment]);

  useEffect(() => {
    if (editingAssignment) {
      editFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [editingAssignment]);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      fetchJSON<AssignmentOut>(`/assignments/${id}`, {
        method: 'DELETE',
      }),
    onMutate: (id) => {
      setDeleteError(null);
      setPendingDeleteId(id);
    },
    onSuccess: (deleted) => {
      queryClient.setQueryData(
        ['assignments'],
        (previous: AssignmentOut[] | undefined) =>
          (previous ?? []).filter((assignment) => assignment.id !== deleted.id),
      );
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
    onError: (error) => {
      setDeleteError(extractErrorMessage(error));
    },
    onSettled: () => {
      setPendingDeleteId(null);
    },
  });

  const createDisabled =
    !createForm.title.trim() ||
    !createForm.courseId.trim() ||
    createMutation.isPending;

  const editDisabled =
    !editingAssignment ||
    !editForm.title.trim() ||
    !editForm.courseId.trim() ||
    editMutation.isPending;

  const handleCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (createDisabled) return;
    const payload: AssignmentCreateIn = {
      title: createForm.title.trim(),
      courseId: createForm.courseId.trim(),
      description: normalizeOptionalText(createForm.description),
      points: coerceNumber(createForm.points),
      dueAt: normalizeDateInput(createForm.dueAt),
      latePolicy: normalizeOptionalText(createForm.latePolicy),
    };
    createMutation.mutate(payload);
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingAssignment || editDisabled) return;
    const payload: AssignmentUpdateIn = {
      title: editForm.title.trim(),
      courseId: editForm.courseId.trim(),
      description: normalizeOptionalText(editForm.description),
      points: coerceNumber(editForm.points),
      dueAt: normalizeDateInput(editForm.dueAt),
      latePolicy: normalizeOptionalText(editForm.latePolicy),
    };
    editMutation.mutate({ id: editingAssignment.id, payload });
  };

  const handleDelete = (assignment: AssignmentOut) => {
    const confirmed = window.confirm(
      `Delete "${assignment.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    deleteMutation.mutate(assignment.id);
  };

  const sortedAssignments = useMemo(
    () =>
      [...assignments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [assignments],
  );

  return (
    <Stack spacing={3}>
      {showCreate && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleCreateSubmit}
            noValidate
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Create assignment</Typography>
              <Button
                size="small"
                onClick={() => {
                  onShowCreateChange(false);
                  setCreateForm(buildCreateForm(assignments));
                }}
              >
                Cancel
              </Button>
            </Stack>
            <TextField
              label="Course ID"
              value={createForm.courseId}
              onChange={(event) =>
                setCreateForm((prev) => ({
                  ...prev,
                  courseId: event.target.value,
                }))
              }
              required
              fullWidth
            />
            <TextField
              label="Title"
              value={createForm.title}
              onChange={(event) =>
                setCreateForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={createForm.description}
              onChange={(event) =>
                setCreateForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              multiline
              minRows={2}
              fullWidth
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Points"
                type="number"
                value={createForm.points}
                onChange={(event) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    points: event.target.value,
                  }))
                }
                inputProps={{ min: 1 }}
                fullWidth
              />
              <TextField
                label="Due date"
                type="datetime-local"
                value={createForm.dueAt}
                onChange={(event) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    dueAt: event.target.value,
                  }))
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              label="Late policy"
              value={createForm.latePolicy}
              onChange={(event) =>
                setCreateForm((prev) => ({
                  ...prev,
                  latePolicy: event.target.value,
                }))
              }
              fullWidth
            />
            {createMutation.isError && (
              <Alert severity="error">
                {extractErrorMessage(createMutation.error)}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={createDisabled}
              aria-label="Create assignment"
            >
              {createMutation.isPending ? 'Creating…' : 'Create assignment'}
            </Button>
          </Stack>
        </Paper>
      )}

      {editingAssignment && (
        <Paper ref={editFormRef} variant="outlined" sx={{ p: 2 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleEditSubmit}
            noValidate
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Edit assignment</Typography>
              <Button
                size="small"
                onClick={() => {
                  onEditingChange(null);
                  if (editingAssignment) {
                    setEditForm(buildEditForm(editingAssignment));
                  }
                }}
              >
                Cancel
              </Button>
            </Stack>
            {editMutation.isPending && (
              <Stack spacing={1}>
                <LinearProgress aria-label="Saving assignment edits" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  aria-live="polite"
                >
                  Saving edits…
                </Typography>
              </Stack>
            )}
            <TextField
              label="Course ID"
              value={editForm.courseId}
              onChange={(event) =>
                setEditForm((prev) => ({
                  ...prev,
                  courseId: event.target.value,
                }))
              }
              required
              fullWidth
            />
            <TextField
              label="Title"
              value={editForm.title}
              onChange={(event) =>
                setEditForm((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={editForm.description}
              onChange={(event) =>
                setEditForm((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              multiline
              minRows={2}
              fullWidth
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Points"
                type="number"
                value={editForm.points}
                onChange={(event) =>
                  setEditForm((prev) => ({
                    ...prev,
                    points: event.target.value,
                  }))
                }
                inputProps={{ min: 1 }}
                fullWidth
              />
              <TextField
                label="Due date"
                type="datetime-local"
                value={editForm.dueAt}
                onChange={(event) =>
                  setEditForm((prev) => ({
                    ...prev,
                    dueAt: event.target.value,
                  }))
                }
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              label="Late policy"
              value={editForm.latePolicy}
              onChange={(event) =>
                setEditForm((prev) => ({
                  ...prev,
                  latePolicy: event.target.value,
                }))
              }
              fullWidth
            />
            {editMutation.isError && (
              <Alert severity="error">
                {extractErrorMessage(editMutation.error)}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={editDisabled}
              aria-label="Save assignment changes"
            >
              {editMutation.isPending ? 'Saving edits…' : 'Save changes'}
            </Button>
          </Stack>
        </Paper>
      )}

      {deleteError && <Alert severity="error">{deleteError}</Alert>}

      {sortedAssignments.length ? (
        <Stack spacing={2}>
          {sortedAssignments.map((assignment) => {
            const isDeleting = pendingDeleteId === assignment.id;
            const isEditingTarget = editingId === assignment.id;
            const dueLabel = formatDueDate(assignment.dueAt);
            return (
              <Paper
                key={assignment.id}
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  borderColor: isEditingTarget ? 'primary.main' : undefined,
                  boxShadow: isEditingTarget ? 2 : undefined,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {assignment.title}
                  </Typography>
                  <Chip
                    size="small"
                    label={assignmentIsOpen(assignment) ? 'Open' : 'Closed'}
                    color={assignmentIsOpen(assignment) ? 'success' : 'default'}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Due {dueLabel} • {assignment.points} pts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Course: {assignment.courseId}
                </Typography>

                {assignment.latePolicy && (
                  <Typography variant="body2" color="text.secondary">
                    Late policy: {assignment.latePolicy}
                  </Typography>
                )}
                {assignment.description && (
                  <Typography variant="body2">
                    {truncate(assignment.description, 240)}
                  </Typography>
                )}

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ pt: 1 }}
                >
                  <Stack direction="row" spacing={1.5} flexWrap="wrap">
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate({
                          to: '/assignments/$id',
                          params: { id: assignment.id },
                        })
                      }
                    >
                      View details
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        onShowCreateChange(false);
                        onEditingChange(assignment.id);
                      }}
                      disabled={isDeleting}
                    >
                      {isEditingTarget ? 'Editing' : 'Edit'}
                    </Button>
                  </Stack>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(assignment)}
                    disabled={isDeleting || isEditingTarget}
                  >
                    {isDeleting ? 'Deleting…' : 'Delete'}
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">No assignments yet</Typography>
          <Typography variant="body2" color="text.secondary">
            Use the button above to add your first assignment.
          </Typography>
          {!showCreate && (
            <Button
              variant="contained"
              onClick={() => onShowCreateChange(true)}
              startIcon={<AddIcon />}
            >
              Create assignment
            </Button>
          )}
        </Paper>
      )}
    </Stack>
  );
}

function AssignmentsFallback() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={220} />
      <Stack spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} variant="rounded" height={120} />
        ))}
      </Stack>
    </Stack>
  );
}

function IconToggleButton({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      aria-label="Toggle create assignment form"
      aria-pressed={active}
      color={active ? 'primary' : 'inherit'}
      startIcon={<AddIcon />}
    >
      {active ? 'Hide form' : 'Add assignment'}
    </Button>
  );
}

function buildCreateForm(assignments: AssignmentOut[]): CreateFormState {
  return {
    courseId: assignments[0]?.courseId ?? '',
    title: '',
    description: '',
    points: assignments[0] ? String(assignments[0].points) : '100',
    dueAt: '',
    latePolicy: '',
  };
}

function buildEditForm(assignment: AssignmentOut | null): CreateFormState {
  return {
    courseId: assignment?.courseId ?? '',
    title: assignment?.title ?? '',
    description: assignment?.description ?? '',
    points: assignment ? String(assignment.points) : '100',
    dueAt: assignment?.dueAt ? toLocalInput(assignment.dueAt) : '',
    latePolicy: assignment?.latePolicy ?? '',
  };
}

function formsEqual(a: CreateFormState, b: CreateFormState) {
  return (
    a.courseId === b.courseId &&
    a.title === b.title &&
    a.description === b.description &&
    a.points === b.points &&
    a.dueAt === b.dueAt &&
    a.latePolicy === b.latePolicy
  );
}

function normalizeOptionalText(value: string) {
  const next = value.trim();
  return next.length ? next : null;
}

function coerceNumber(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeDateInput(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function assignmentIsOpen(assignment: AssignmentOut) {
  if (!assignment.dueAt) return true;
  return new Date(assignment.dueAt) > new Date();
}

function formatDueDate(value: string | null) {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function toLocalInput(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const tzOffset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - tzOffset * 60_000);
  return local.toISOString().slice(0, 16);
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1)}…`;
}

function extractErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return 'Something went wrong.';
}
