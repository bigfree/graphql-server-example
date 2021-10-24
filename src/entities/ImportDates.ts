import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class ImportDates {
    @Field()
    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @Field({ nullable: true })
    @UpdateDateColumn({ type: "timestamp with time zone", nullable: true })
    updatedAt?: Date;

    @Field({ nullable: true })
    @Column({ type: "timestamp with time zone", nullable: true })
    deletedAt?: Date;
}