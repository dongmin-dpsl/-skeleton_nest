import { PostModel } from '../../post.model';

export interface PostUseCase {
  registerPost: (createPostCommand: CreatePostCommand) => Promise<PostModel>;
  findAll: () => Promise<PostModel[]>;
  findOne: (id: number) => Promise<PostModel>;
  updatePost(
    id: number,
    updatePostCommand: UpdatePostCommand,
  ): Promise<PostModel>;
  deletePost: (id: number) => Promise<void>;
}

export class CreatePostCommand {
  title: string;
  content: string;
  writer: string;
}

export class UpdatePostCommand extends CreatePostCommand {}

export class DeletePostCommand {
  id: number;
}

export class FindOnePostQuery {
  id: number;
}
