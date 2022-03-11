import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

@Entity("admin_user_logs")
export class AdminUserLogs {
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Column({
        type: "int",
        nullable: false,
        name: "operation_uid",
    })
    optUid: number;

    @Column({
        type: "varchar",
        nullable: false,
        name: "operation_username",
        default:''
    })
    optUsername: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 255,
        name: "path",
    })
    path: string;

    @Column({
        type: "text",
        nullable: true,
        name: "body",
        charset: 'utf8mb4'
    })
    body: string;

    @Column({
        type: "text",
        nullable: false,
        name: "useragent",
    })
    useragent: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        name: "ip",
    })
    ip: string;

    @Index('create_time')
    @Column({
        type: "bigint",
        name: "create_time"
    })
    createTime: number;
}
