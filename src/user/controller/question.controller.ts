import { Controller,Post ,Body,Get,Put,Delete} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PhotoEntity } from '../models/post.interface';
import { UpdateResult ,DeleteResult} from 'typeorm';
import { Param } from '@nestjs/common';
import { QuestionService } from '../services/question.service';


@Controller('photo')
export class QuestionController{
  constructor(private questionService: QuestionService){}

  @Post()
  create(@Body() post: PhotoEntity) : Observable<PhotoEntity> {
    try {
      return this.questionService.createPost(post)
    } catch (error) {
      console.log(error)
    }
  }


 @Get()
  findAll(): Observable<PhotoEntity[]> {
    try {
      return this.questionService.findAllPosts()
    } catch (error) {
      console.log(error)
    }
  }


  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() photoEntity: PhotoEntity,
  ): Observable<UpdateResult> {
    try {
      return this.questionService.updatePost(id, photoEntity);
    } catch (error) {
      console.log(error)
    }
  }


  @Delete(":id")
  delete(@Param('id') id: number): Observable<DeleteResult>{
    try {
      return this.questionService.deletePost(id);
    } catch (error) {
      console.log(error)
    }
  }


  @Get('/pohot-by-user')
  async getPhotoByUser(): Promise<PhotoEntity[]> {
    try {
      return await this.questionService.getPhotoByUser()
    } catch (error) {
      console.log(error)
    }
  }
   

  @Get('/pohot-url')
  async  getPhotoByUrl(): Promise<PhotoEntity[]> {
    try {
      return await this.questionService.getPhotoByUrl()
    } catch (error) {
      console.log(error)
    }
  }
 
}