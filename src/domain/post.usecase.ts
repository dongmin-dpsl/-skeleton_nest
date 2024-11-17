import { PostModel, RegisterPost } from './post.model';

export interface PostUseCase {
  registerPost: (registerPost: RegisterPost) => Promise<PostModel>;
}
