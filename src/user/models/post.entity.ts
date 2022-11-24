

import {Column,Entity,OneToMany,PrimaryGeneratedColumn} from 'typeorm';
import {
  ManyToOne,
} from "typeorm" 

  @Entity('user')
  export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false})
    password: number

    @OneToMany((type) => Photo, (photo) => photo.user)
    photos: Photo[] 
  }

  @Entity('photo')
  export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @ManyToOne((type) => User, (user) => user.photos)
    user: User

  }

