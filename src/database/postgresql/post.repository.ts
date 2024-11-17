import { EntityRepository } from "@mikro-orm/postgresql";
import { Post } from "./post.entity";

export class PostRepository extends EntityRepository<Post> {

}