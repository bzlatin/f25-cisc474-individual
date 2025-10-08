import { useMemo, useState } from 'react';
import {
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Alert,
  Snackbar,
  Tooltip,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import ScienceIcon from '@mui/icons-material/Science';

type SubmissionType = 'file' | 'url' | 'repo' | 'ens';

export default function SubmissionsClient({
  assignmentId,
}: {
  assignmentId?: string;
}) {
  const [type, setType] = useState<SubmissionType>('file');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [repo, setRepo] = useState('');
  const [ensFile, setEnsFile] = useState<File | null>(null);
  const [ensParams, setEnsParams] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const validationMessage = useMemo(() => {
    if (type === 'file' && !file) return 'Please choose a file to upload.';
    if (type === 'url' && !url) return 'Please enter a URL.';
    if (type === 'repo' && !repo) return 'Please enter a Git repo URL.';
    if (type === 'ens' && !ensFile)
      return 'Please upload a .ipynb or .qmd notebook.';
    return null;
  }, [type, file, url, repo, ensFile]);

  const onSubmit = async () => {
    try {
      setErr(null);
      if (validationMessage) {
        setErr(validationMessage);
        return;
      }
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 700));
      setOk(true);
      setFile(null);
      setUrl('');
      setRepo('');
      setEnsFile(null);
      setEnsParams('');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message || 'Submission failed');
      } else {
        setErr('Submission failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Submit Work
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {assignmentId ? `Assignment: ${assignmentId}` : 'No assignment specified'}
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            select
            fullWidth
            label="Submission Type"
            value={type}
            onChange={(e) => setType(e.target.value as SubmissionType)}
          >
            <MenuItem value="file">File Upload</MenuItem>
            <MenuItem value="url">URL</MenuItem>
            <MenuItem value="repo">Git Repository</MenuItem>
            <MenuItem value="ens">Executable Notebook (ENS)</MenuItem>
          </TextField>

          {type === 'file' && (
            <Stack spacing={1.5}>
              <Tooltip title="Upload a ZIP, PDF, or code file">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Choose File
                  <input
                    hidden
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </Button>
              </Tooltip>
              <FormHelperText>
                {file ? `Selected: ${file.name}` : 'No file selected'}
              </FormHelperText>
            </Stack>
          )}

          {type === 'url' && (
            <TextField
              fullWidth
              label="Submission URL"
              placeholder="https://example.com/my-project"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {type === 'repo' && (
            <TextField
              fullWidth
              label="Git Repository URL"
              placeholder="https://github.com/user/repo"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GitHubIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              helperText="We will fetch and build from your default branch."
            />
          )}

          {type === 'ens' && (
            <Stack spacing={1.5}>
              <Tooltip title="Upload a Jupyter (.ipynb) or Quarto (.qmd) notebook">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<ScienceIcon />}
                >
                  Upload Notebook
                  <input
                    hidden
                    accept=".ipynb,.qmd"
                    type="file"
                    onChange={(e) => setEnsFile(e.target.files?.[0] ?? null)}
                  />
                </Button>
              </Tooltip>
              <FormHelperText>
                {ensFile ? `Selected: ${ensFile.name}` : 'No notebook selected'}
              </FormHelperText>
              <TextField
                fullWidth
                label="ENS Parameters (optional)"
                placeholder="dataset=small,seed=42"
                value={ensParams}
                onChange={(e) => setEnsParams(e.target.value)}
                helperText="Key=value pairs, comma-separated. Injected at execution time."
              />
              <Alert severity="info" variant="outlined">
                ENS submissions run in a sandbox with course-defined tests. You’ll
                receive structured feedback and artifacts after execution.
              </Alert>
            </Stack>
          )}

          {err && <Alert severity="error">{err}</Alert>}

          <Stack direction="row" spacing={1}>
            <Button onClick={onSubmit} disabled={submitting} variant="contained">
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setFile(null);
                setUrl('');
                setRepo('');
                setEnsFile(null);
                setEnsParams('');
                setErr(null);
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Snackbar
        open={ok}
        autoHideDuration={2000}
        onClose={() => setOk(false)}
        message="Submission received"
      />
    </Stack>
  );
}
