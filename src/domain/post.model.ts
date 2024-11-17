export class PostModel {
  id: number;
  title: string;
  content: string;
  writer: string;
}

export interface CreatePostCommand {
  title: string;
  content: string;
  writer: string;
}
