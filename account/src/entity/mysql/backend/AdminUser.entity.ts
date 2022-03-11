import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("admin_user")
export class AdminUser {
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
        length: 64,
        name: "username",
        charset: 'utf8mb4'
    })
    username: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 64,
        name: "password",
        charset: 'utf8mb4'
    })
    password: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 32,
        name: "real_name",
        charset: 'utf8mb4'
    })
    realName: string;

    @Column({
        type: "text",
        nullable: false,
        name: "avatar",
        charset: 'utf8mb4'
    })
    avatar: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 100,
        name: "group_id",
        charset: 'utf8mb4'
    })
    groupId: string;

    @Column({
        type: "bigint",
        name: "create_time"
    })
    createTime: number;
}
