export class PostModel {
  id: number;
  title: string;
  content: string;
  writer: string;
}

export interface RegisterPost {
  title: string;
  content: string;
  writer: string;
}
