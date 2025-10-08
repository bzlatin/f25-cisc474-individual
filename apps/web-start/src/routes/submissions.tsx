import { createFileRoute } from '@tanstack/react-router';
import SubmissionsClient from '../components/SubmissionsClient';

type SubmissionsSearch = {
  assignment?: string;
};

export const Route = createFileRoute('/submissions')({
  component: SubmissionsPage,
  validateSearch: (search): SubmissionsSearch => ({
    assignment:
      typeof search.assignment === 'string' ? search.assignment : undefined,
  }),
});

function SubmissionsPage() {
  const search = Route.useSearch();
  return <SubmissionsClient assignmentId={search.assignment} />;
}
