'use client';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Chip,
} from '@mui/material';

type Row = {
  student: string;
  course: string;
  a1?: number | null;
  a2?: number | null;
  a3?: number | null;
  overall?: number | null;
};

const rows: Row[] = [
  {
    student: 'Alex Johnson',
    course: 'CISC474',
    a1: 95,
    a2: 88,
    a3: 92,
    overall: 92,
  },
  {
    student: 'Ben Zlatin',
    course: 'CISC474',
    a1: 98,
    a2: 90,
    a3: 94,
    overall: 94,
  },
  {
    student: 'Chris Lee',
    course: 'CISC220',
    a1: 86,
    a2: 79,
    a3: 0,
    overall: 72,
  },
];

function ScoreCell({ v }: { v?: number | null }) {
  if (v === null || v === undefined)
    return <Chip size="small" label="—" variant="outlined" />;
  if (v === 0)
    return (
      <Chip size="small" label="Missing" color="error" variant="outlined" />
    );
  return <>{v}</>;
}

export default function GradebookPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Gradebook</Typography>
      <Paper variant="outlined" sx={{ p: 1, overflow: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Assignment 1</TableCell>
              <TableCell>Assignment 2</TableCell>
              <TableCell>Assignment 3</TableCell>
              <TableCell>Overall</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.student + r.course} hover>
                <TableCell>{r.student}</TableCell>
                <TableCell>{r.course}</TableCell>
                <TableCell>
                  <ScoreCell v={r.a1} />
                </TableCell>
                <TableCell>
                  <ScoreCell v={r.a2} />
                </TableCell>
                <TableCell>
                  <ScoreCell v={r.a3} />
                </TableCell>
                <TableCell>
                  <ScoreCell v={r.overall} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
