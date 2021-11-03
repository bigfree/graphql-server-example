import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, InterfaceType } from "type-graphql";
import { IsDate } from "class-validator";

@InterfaceType()
export abstract class NodeTimestamps {
    @Field()
    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;

    @Field({ nullable: true })
    @UpdateDateColumn({ type: "timestamp with time zone", nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt?: Date;

    @Field({ nullable: true })
    @Column({ type: "timestamp with time zone", nullable: true })
    @IsDate()
    deletedAt?: Date;
}