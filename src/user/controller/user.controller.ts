import { Controller,Post ,Body,Get,Put,Delete, BadRequestException, Res, Request, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserEntity } from '../models/post.interface';
import { UpdateResult ,DeleteResult} from 'typeorm';
import { Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController{
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
) {}

 @Post()
  async create(@Body() post: UserEntity) : Promise<Observable<UserEntity>> {
    try {
      return this.userService.createPost(post);
    } catch (error) {
      console.log(error)
    }
  }

 @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: number,
        @Res({passthrough: true}) response: Response
    ) {
      try {
        const user = await this.userService.findOne(email);

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if(user.password !== password){
          throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});
        return {
          message: 'message'
      };
      } catch (error) {
        console.log(error)
      }
    }



 @Get()
  findAll(): Observable<UserEntity[]> {
    try {
      return this.userService.findAllPosts()
    } catch (error) {
      console.log(error)
    }
  }


  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() userEntity:UserEntity,
  ): Observable<UpdateResult> {
    try {
      return this.userService.updatePost(id, userEntity);
    } catch (error) {
      console.log(error)
    }
  }


  @Delete(":id")
  delete(@Param('id') id: number): Observable<DeleteResult>{
    try {
      return this.userService.deletePost(id);
    } catch (error) {
      console.log(error)
    }
  }


  @Get('/all-user')
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userService.getAllUsers()
    } catch (error) {
      console.log(error)
    }
  }


  @Get('/data')
  async getDataUsingFind(): Promise<UserEntity[]> {
    try {
      return await this.userService.getDataUsingFind()
    } catch (error) {
      console.log(error)
    }
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return 'File upload API';
  }
  
  @Get(':name')
  async getSingleUser(){
    try {
      return await this.userService.getSingleUser()
    } catch (error) {
      console.log(error)
    }
  }


}