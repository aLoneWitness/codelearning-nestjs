import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentModule } from './assignment/assignment.module';
import { AssignmentInputModule } from './assignment-input/assignment-input.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'codelearning',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    QuizModule,
    AssignmentModule,
    AssignmentInputModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
