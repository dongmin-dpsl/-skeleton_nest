import { PostModel } from '../../post.model';

export interface PostDbQueryPort {
  findAll(): Promise<PostModel[]>;
  findOne(id: number): Promise<PostModel>;
}
