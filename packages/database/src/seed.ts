import { prisma, CourseRole, SubmissionType, SubmissionStatus } from './client';

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function main() {
  // --- USERS ---
  const mark = await prisma.user.upsert({
    where: { email: 'mark@lumon.com' },
    update: { name: 'Mark Scout' },
    create: { name: 'Mark Scout', email: 'mark@lumon.com' },
  });

  const helly = await prisma.user.upsert({
    where: { email: 'helly@lumon.com' },
    update: { name: 'Helly R' },
    create: { name: 'Helly R', email: 'helly@lumon.com' },
  });

  const irving = await prisma.user.upsert({
    where: { email: 'irving@lumon.com' },
    update: { name: 'Irving Bailiff' },
    create: { name: 'Irving Bailiff', email: 'irving@lumon.com' },
  });

  const dylan = await prisma.user.upsert({
    where: { email: 'dylan@lumon.com' },
    update: { name: 'Dylan George' },
    create: { name: 'Dylan George', email: 'dylan@lumon.com' },
  });

  const harmony = await prisma.user.upsert({
    where: { email: 'harmony@lumon.com' },
    update: { name: 'Harmony Cobel' },
    create: { name: 'Harmony Cobel', email: 'harmony@lumon.com' },
  });

  const milchick = await prisma.user.upsert({
    where: { email: 'milchick@lumon.com' },
    update: { name: 'Mr. Milchick' },
    create: { name: 'Mr. Milchick', email: 'milchick@lumon.com' },
  });

  // --- COURSES ---
  const macro = await prisma.course.upsert({
    where: { code_title: { code: 'LUMON101', title: 'Macrodata Refinement' } },
    update: {},
    create: {
      code: 'LUMON101',
      title: 'Macrodata Refinement',
      description: 'Identify and sort scary numbers in datasets.',
    },
  });

  const wellness = await prisma.course.upsert({
    where: { code_title: { code: 'LUMON201', title: 'Wellness Sessions' } },
    update: {},
    create: {
      code: 'LUMON201',
      title: 'Wellness Sessions',
      description: 'Therapeutic self-reflection with Ms. Casey.',
    },
  });

  // --- ENROLLMENTS ---
  await prisma.enrollment.createMany({
    data: [
      {
        userId: harmony.id,
        courseId: macro.id,
        role: CourseRole.instructor,
        section: '010',
      },
      {
        userId: mark.id,
        courseId: macro.id,
        role: CourseRole.learner,
        section: '010',
      },
      {
        userId: helly.id,
        courseId: macro.id,
        role: CourseRole.learner,
        section: '010',
      },
      {
        userId: irving.id,
        courseId: macro.id,
        role: CourseRole.learner,
        section: '010',
      },
      {
        userId: dylan.id,
        courseId: macro.id,
        role: CourseRole.learner,
        section: '010',
      },

      {
        userId: milchick.id,
        courseId: wellness.id,
        role: CourseRole.instructor,
        section: '020',
      },
      {
        userId: mark.id,
        courseId: wellness.id,
        role: CourseRole.learner,
        section: '020',
      },
      {
        userId: helly.id,
        courseId: wellness.id,
        role: CourseRole.learner,
        section: '020',
      },
    ],
    skipDuplicates: true,
  });

  // --- ASSIGNMENTS ---
  const macroA1 = await prisma.assignment.create({
    data: {
      courseId: macro.id,
      title: 'Scary Numbers Sorting',
      description: 'Identify numbers that feel unsettling.',
      points: 100,
      dueAt: daysFromNow(3),
    },
  });

  const wellnessA1 = await prisma.assignment.create({
    data: {
      courseId: wellness.id,
      title: 'Self-Reflection Letter',
      description: 'Write a letter to your outie about your innie’s feelings.',
      points: 100,
      dueAt: daysFromNow(7),
    },
  });

  // --- SUBMISSIONS ---
  const s1 = await prisma.submission.create({
    data: {
      assignmentId: macroA1.id,
      authorId: mark.id,
      type: SubmissionType.file,
      filename: 'scary_numbers.pdf',
      contentType: 'application/pdf',
      status: SubmissionStatus.received,
      late: false,
    },
  });

  const s2 = await prisma.submission.create({
    data: {
      assignmentId: macroA1.id,
      authorId: helly.id,
      type: SubmissionType.file,
      filename: 'refinement_notebook.ipynb',
      contentType: 'application/x-ipynb+json',
      status: SubmissionStatus.received,
      late: false,
    },
  });

  const s3 = await prisma.submission.create({
    data: {
      assignmentId: wellnessA1.id,
      authorId: irving.id,
      type: SubmissionType.url,
      url: 'https://lumon-wellness.example/irving-letter',
      status: SubmissionStatus.received,
      late: false,
    },
  });

  // --- SCORES & FEEDBACK ---
  await prisma.score.create({
    data: {
      submissionId: s1.id,
      points: 92,
      comment: 'Effective identification of unsettling data points.',
    },
  });

  await prisma.feedback.create({
    data: {
      submissionId: s2.id,
      authorId: harmony.id,
      body: 'Notebook well-organized. Remember: the numbers are scary for a reason.',
    },
  });

  console.log('✅ Seed complete with dummy data');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
