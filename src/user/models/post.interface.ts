export interface UserEntity {
  id?: number;
  name?: string;
  photo?: PhotoEntity;
}

export interface PhotoEntity {
  id?: number;
  url?: string;
  user?:UserEntity;

}