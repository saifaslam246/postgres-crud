import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User, Photo } from './models/post.entity';
import { UserController, } from './controller/user.controller';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './services/question.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[
      TypeOrmModule.forFeature([User,Photo])
  ],
  providers: [UserService,QuestionService,JwtService],
  controllers:[QuestionController,UserController],
  
})
export class UserModule {}
