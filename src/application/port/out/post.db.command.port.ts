import { PostModel } from '../../../domain/post.model';
import { CreatePostCommand, UpdatePostCommand } from '../in/post.usecase';

export interface PostDbCommandPort {
  createPost(createPostCommand: CreatePostCommand): Promise<PostModel>;
  updatePost(
    id: number,
    updatePostCommand: UpdatePostCommand,
  ): Promise<PostModel>;
  deletePost(id: number): Promise<void>;
}
