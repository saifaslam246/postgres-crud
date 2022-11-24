export interface UserEntity {
  id?: number;
  name?: string;
  email?: string;
  photo?: PhotoEntity;
  password?: number;
}

export interface PhotoEntity {
  id?: number;
  url?: string;
  user?:UserEntity;

}