'use client';

import { Box, Paper, Typography, Divider, Stack } from '@mui/material';

type CourseCardProps = {
  code: string;
  title: string;
  color?: string; // top accent color
  nextDue?: string;
};

export default function CourseCard({
  code,
  title,
  color = '#4f46e5', // default indigo
  nextDue,
}: CourseCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': { boxShadow: 4 },
        display: 'flex',
        flexDirection: 'column',
        height: 150,
      }}
    >
      {/* Top color band */}
      <Box sx={{ height: 6, backgroundColor: color }} />

      <Stack sx={{ p: 2, flex: 1, justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {code}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {nextDue ? `Next due: ${nextDue}` : 'No upcoming work'}
        </Typography>
      </Stack>
    </Paper>
  );
}
