import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseTimeEntity } from './base-time';

@Entity({ tableName: 'post' })
export class Post extends BaseTimeEntity {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  writer: string;
}
