import { useSuspenseQuery } from '@tanstack/react-query';
import CourseCard from './CourseCard';
import { fetchJSON } from '../lib/api';

type Course = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
};

export default function CoursesList() {
  const { data: courses = [] } = useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: () => fetchJSON<Course[]>('/courses'),
    staleTime: 60_000,
  });

  if (!courses.length) return null;

  return (
    <>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          code={course.code}
          title={course.title}
          color="#2563eb"
        />
      ))}
    </>
  );
}
