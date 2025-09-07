'use client';

import { Box, Paper, Stack, Typography, Divider } from '@mui/material';
import RightPanel from '../components/dashboard/RightPanel';

export default function HomePage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Dashboard
      </Typography>

      {/* Two-column flex: left grows, right is fixed width */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT: course cards grid */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
              },
              gap: 2,
            }}
          >
            {['CISC474', 'CISC361', 'CISC220'].map((course, i) => (
              <Paper
                key={i}
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  height: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {course}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flex: 1 }}
                >
                  Next assignment due soon…
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: 'none', md: 'block' },
            borderColor: (t) => t.palette.divider,
          }}
        />

        <Box
          sx={{
            width: { xs: '100%', md: 260 },
            position: { md: 'sticky' },
            top: { md: 24 },
            alignSelf: 'flex-start',
            pl: { md: 2 },
          }}
        >
          <RightPanel />
        </Box>
      </Box>
    </Stack>
  );
}
