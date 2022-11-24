import { Controller,Post ,Body,Get,Put,Delete} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { UserEntity } from '../models/post.interface';
import { UpdateResult ,DeleteResult} from 'typeorm';
import { Param } from '@nestjs/common';

@Controller('user')
export class UserController{
  constructor(private userService: UserService){}
  
  @Post()
  create(@Body() post: UserEntity) : Observable<UserEntity> {
    try {
      return this.userService.createPost(post);
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
  

  @Get('/name')
  async getSingleUser(){
    try {
      return await this.userService.getSingleUser()
    } catch (error) {
      console.log(error)
    }
  }
}