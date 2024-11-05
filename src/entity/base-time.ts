import {  Property } from "@mikro-orm/core";

export abstract class BaseTimeEntity {
    @Property({name: 'created_at'})
    createdAt = new Date();

    @Property({ name: 'updated_at', onUpdate: () => new Date()})
    updatedAt = new Date();
}