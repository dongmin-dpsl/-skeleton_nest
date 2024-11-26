import { PostModel } from '../../../domain/post.model';

export interface PostDbQueryPort {
  findAll(): Promise<PostModel[]>;
  findOne(id: number): Promise<PostModel>;
}
