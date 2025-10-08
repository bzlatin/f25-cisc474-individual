// apps/web/components/CoursesList.client.tsx
'use client';

import useSWR from 'swr';
import CourseCard from './CourseCard';

type Course = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
};

const BASE = process.env.VITE_BACKEND_URL!;
const fetcher = async (): Promise<Course[]> => {
  const res = await fetch(`${BASE}/courses`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`GET /courses failed: ${res.status}`);
  return res.json();
};

export default function CoursesList() {
  const { data: courses } = useSWR<Course[]>('/courses', fetcher, {
    suspense: true,
    revalidateOnFocus: false,
    fallbackData: [],
  });

  if (!courses?.length) return null;

  return (
    <>
      {courses.map((c) => (
        <CourseCard
          key={c.id}
          code={c.code}
          title={c.title}
          color="#2563eb"
          nextDue={undefined}
        />
      ))}
    </>
  );
}
