import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module';

import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ScoresModule } from './scores/scores.module';
import { FeedbackModule } from './feedback/feedback.module';

import { LinksModule } from './links/links.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    CoursesModule,
    EnrollmentsModule,
    AssignmentsModule,
    SubmissionsModule,
    ScoresModule,
    FeedbackModule,
    LinksModule,
  ],
=======
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { GroupsModule } from './groups/groups.module';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [UsersModule, CoursesModule, AssignmentsModule, GroupsModule, SubmissionsModule],
>>>>>>> upstream/main
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
