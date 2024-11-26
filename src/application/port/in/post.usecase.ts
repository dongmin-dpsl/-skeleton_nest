import { PostModel } from '../../../domain/post.model';

export interface PostUseCase {
  registerPost(createPostCommand: CreatePostCommand): Promise<PostModel>;
  findAll(findPostListCommand: FindPostListCommand): Promise<PostModel[]>;
  findOne(id: number): Promise<PostModel>;
  updatePost(
    id: number,
    updatePostCommand: UpdatePostCommand,
  ): Promise<PostModel>;
  deletePost(id: number): Promise<void>;
}

import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  NotEquals,
  Min,
  Max,
} from 'class-validator';

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
export class FindPostListCommand {
  @IsNumber()
  @Min(0)
  from: number;

  @Min(1)
  @Max(100)
  size: number;
}
export class UpdatePostCommand extends CreatePostCommand {}

export class DeletePostCommand {
  id: number;
}

export class FindOnePostQuery {
  id: number;
}
