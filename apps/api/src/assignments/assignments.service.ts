import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  AssignmentCreateIn,
  AssignmentOut,
  AssignmentUpdateIn,
} from '@repo/api/assignments';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<AssignmentOut[]> {
    const rows = await this.withPreparedStatementRetry(() =>
      this.prisma.assignment.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    );
    return rows.map((row) => this.toAssignmentOut(row));
  }

  async findOne(id: string): Promise<AssignmentOut> {
    const row = await this.withPreparedStatementRetry(() =>
      this.prisma.assignment.findUnique({ where: { id } }),
    );
    if (!row) throw new NotFoundException(`Assignment ${id} not found`);
    return this.toAssignmentOut(row);
  }

  async create(data: AssignmentCreateIn): Promise<AssignmentOut> {
    const assignment = await this.withPreparedStatementRetry(() =>
      this.prisma.assignment.create({
        data: {
          title: data.title,
          description: data.description ?? null,
          courseId: data.courseId,
          points: data.points ?? 100,
          dueAt: data.dueAt ? new Date(data.dueAt) : null,
          latePolicy: data.latePolicy ?? null,
        },
      }),
    );
    return this.toAssignmentOut(assignment);
  }

  async update(
    id: string,
    data: AssignmentUpdateIn,
  ): Promise<AssignmentOut> {
    const existing = await this.withPreparedStatementRetry(() =>
      this.prisma.assignment.findUnique({ where: { id } }),
    );
    if (!existing) throw new NotFoundException(`Assignment ${id} not found`);

    const assignment = await this.withPreparedStatementRetry(() =>
      this.prisma.assignment.update({
        where: { id },
        data: {
          title: data.title ?? undefined,
          description:
            data.description === undefined ? undefined : data.description,
          courseId: data.courseId ?? undefined,
          points: data.points ?? undefined,
          dueAt:
            data.dueAt === undefined
              ? undefined
              : data.dueAt
                ? new Date(data.dueAt)
                : null,
          latePolicy:
            data.latePolicy === undefined ? undefined : data.latePolicy,
        },
      }),
    );

    return this.toAssignmentOut(assignment);
  }

  async remove(id: string): Promise<AssignmentOut> {
    const assignment = await this.withPreparedStatementRetry(() =>
      this.prisma.assignment.delete({ where: { id } }),
    );
    return this.toAssignmentOut(assignment);
  }

  private toAssignmentOut(row: {
    id: string;
    title: string;
    description: string | null;
    courseId: string;
    points: number;
    dueAt: Date | null;
    latePolicy: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): AssignmentOut {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      courseId: row.courseId,
      points: row.points,
      dueAt: row.dueAt ? row.dueAt.toISOString() : null,
      latePolicy: row.latePolicy,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };
  }

  private async withPreparedStatementRetry<T>(
    operation: () => Promise<T>,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (!this.isPreparedStatementError(error)) {
        throw error;
      }
      await this.prisma.$executeRawUnsafe('DEALLOCATE ALL');
      return operation();
    }
  }

  private isPreparedStatementError(error: unknown): boolean {
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return /prepared statement ".+" already exists/i.test(error.message);
    }
    return false;
  }
}
