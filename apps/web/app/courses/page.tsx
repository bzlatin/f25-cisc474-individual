'use client';

import Link from 'next/link';
import { Typography, Stack, Card, CardContent, Button } from '@mui/material';

type Course = { code: string; title: string; href: string };

const courses: Course[] = [
  { code: 'CISC474', title: 'Web Applications', href: '/assignments' },
  { code: 'CISC361', title: 'Operating Systems', href: '/assignments' },
  { code: 'CISC220', title: 'Data Structures', href: '/assignments' },
];

export default function CoursesPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Courses
      </Typography>
      <Typography variant="body1">
        Your enrolled courses will appear here.
      </Typography>

      <Stack spacing={2}>
        {courses.map((c) => (
          <Card key={c.code} variant="outlined">
            <CardContent>
              <Typography variant="h6">
                {c.code}: {c.title}
              </Typography>
              <Button
                component={Link}
                href={c.href}
                sx={{ mt: 1 }}
                variant="contained"
              >
                View Assignments
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
