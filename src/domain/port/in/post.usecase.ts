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

import { IsNotEmpty, MaxLength, NotEquals } from 'class-validator';

export class CreatePostCommand {
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @NotEquals(null)
  @IsNotEmpty()
  content: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(5)
  writer: string;
}

export class UpdatePostCommand extends CreatePostCommand {}

export class DeletePostCommand {
  id: number;
}

export class FindOnePostQuery {
  id: number;
}
