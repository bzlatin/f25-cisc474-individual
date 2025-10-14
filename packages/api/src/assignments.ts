import { z } from 'zod';
import { Pagination } from './queries';

// Reference DTOs (lightweight relation embeds)
export const AssignmentRef = z.object({
  id: z.uuid(),
  title: z.string(),
});
export type AssignmentRef = z.infer<typeof AssignmentRef>;

// Output DTOs (API responses)
export const AssignmentOut = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  courseId: z.uuid(),
  points: z.number(),
  dueAt: z.iso.datetime().nullable(),
  latePolicy: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});
export type AssignmentOut = z.infer<typeof AssignmentOut>;

// Creation DTOs (API request bodies)
export const AssignmentCreateIn = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  courseId: z.uuid(),
  points: z.number().int().positive().optional(),
  dueAt: z.string().datetime().optional().nullable(),
  latePolicy: z.string().optional().nullable(),
});
export type AssignmentCreateIn = z.infer<typeof AssignmentCreateIn>;

// Update DTOs (API request bodies)
export const AssignmentUpdateIn = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  courseId: z.uuid().optional(),
  points: z.number().int().positive().optional(),
  dueAt: z.string().datetime().optional().nullable(),
  latePolicy: z.string().optional().nullable(),
});
export type AssignmentUpdateIn = z.infer<typeof AssignmentUpdateIn>;

// Query DTOs (API query parameters)
export const AssignmentsListFilter = Pagination.extend({
  courseId: z.uuid().optional(),
  titleLike: z.string().optional(),
});

// Parameter DTOs (shared route params)
export const AssignmentIdParams = z.object({
  id: z.uuid(),
});
export type AssignmentIdParams = z.infer<typeof AssignmentIdParams>;
