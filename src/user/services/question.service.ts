import { Injectable } from '@nestjs/common';
import { PhotoEntity } from '../models/post.interface';
import { Photo } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable,from } from 'rxjs';
import { UpdateResult,DeleteResult } from 'typeorm';
@Injectable()
export class QuestionService {
    constructor(
    @InjectRepository(Photo)
        private readonly feedPostRepository: Repository<Photo>,
    ) { }

    createPost(photoEntity: PhotoEntity): Observable<PhotoEntity> {
      try{
        return from(this.feedPostRepository.save(photoEntity));
      }
      catch(error){
        console.log(error) }
      }


     findAllPosts(): Observable<PhotoEntity[]> {
        try {
          return from(this.feedPostRepository.find());
        } catch (error) {
          console.log(error)
        }
      }


    updatePost(id: number, photoEntity: PhotoEntity): Observable<UpdateResult> {
        try {
          return from(this.feedPostRepository.update(id, photoEntity));
        } catch (error) {
          console.log(error)
        }
      }


    deletePost(id: number): Observable<DeleteResult> {
      try {
        return from(this.feedPostRepository.delete(id));
        } catch (error) {
        console.log(error)
        }
      }


    async getPhotoByUser(): Promise<PhotoEntity[]>{
      try {
        return await this.feedPostRepository
        .createQueryBuilder("photo")
        .leftJoinAndSelect("photo.user", "user")
        .getMany()
        } catch (error) {
        console.log(error)
        }
      }


      async getPhotoByUrl (): Promise<PhotoEntity[]>{
        try {
          return await this.feedPostRepository.find({
            where: {
              url:'yahoo.com'
          }
          })
        } catch (error) {
          console.log(error)
        } 
      } 
}