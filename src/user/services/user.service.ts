import { Injectable } from '@nestjs/common';
import { UserEntity} from '../models/post.interface';
import { User} from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable,from } from 'rxjs';
import { UpdateResult,DeleteResult } from 'typeorm';
import { Request,Response } from '@nestjs/common';
@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
        private readonly feedPostRepository: Repository<User>,
    ) { }

    createPost(userEntity: UserEntity): Observable<UserEntity> {
      try {
        return from(this.feedPostRepository.save(userEntity));
      } catch (error) {
        console.log(error) }
      }


    findAllPosts(): Observable<UserEntity[]> {
        try {
          return from(this.feedPostRepository.find());//there's another way of doing it
        } catch (error) {
          console.log(error)}
      }


    updatePost(id: number, userEntity: UserEntity): Observable<UpdateResult> {
        try {
          return from(this.feedPostRepository.update(id, userEntity));//there's another way of doing it
        } catch (error) {
          console.log(error)
        }
      }


    deletePost(id: number): Observable<DeleteResult> {
      try {
        return from(this.feedPostRepository.delete(id));//there's another way of doing it
        } catch (error) {
        console.log(error)
        }
      }


    async getAllUsers (): Promise<UserEntity[]>{
      try {
        return await this.feedPostRepository.createQueryBuilder('user').getMany()//there's another way of doing it
        } catch (error) {
        console.log(error)
        }
      }

 
    async getDataUsingFind (): Promise<UserEntity[]>{
      try {
        return await this.feedPostRepository.find({
          join: {
            alias: "user",
            innerJoinAndSelect: {
                photo: "user.photos",
            }
        }
        })//there's another way of doing it
         } catch (error) {
        console.log(error)
         }
      }

      
    async getSingleUser (){
      try {
        return await this.feedPostRepository.createQueryBuilder('user')
        .where('user.name=:name',{name:'Saif ur Rehman'}).getMany()
          } catch (error) {
        console.log(error)
          }

      }
}