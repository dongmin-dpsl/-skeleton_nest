import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { PostRepository } from './post.repository';
import { BaseTimeEntity } from './base-time';

@Entity({ repository: () => PostRepository, tableName: 'post' })
export class Post {
  [EntityRepositoryType]?: PostRepository;

  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  writer: string;
}
