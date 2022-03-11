import {Column, Entity, Index, PrimaryColumn} from "typeorm";

@Entity("loginlog")
export class LoginLog {
    @PrimaryColumn({
        type: 'bigint',
        name: 'id',
        generated: 'increment'
    })
    id: number;

    @Index("uid-idx")
    @Column({
        type: "bigint",
        name: "uid"
    })
    uid: number;

    @Column({
        type: "longtext",
        name: "message",
        charset: 'utf8mb4',
        nullable: true
    })
    message: string;

    @Column({
        type: "varchar",
        length: 128,
        name: "deviceId",
        charset: 'utf8mb4',
        nullable: true
    })
    deviceId: string;

    @Column({
        type: "varchar",
        length: 128,
        name: "deviceModel",
        charset: 'utf8mb4',
        nullable: true
    })
    deviceModel: string;

    @Column({
        type: "varchar",
        length: 128,
        name: "android",
        charset: 'utf8mb4',
        nullable: true
    })
    android: string;

    @Column({
        type: "varchar",
        length: 128,
        name: "version",
        charset: 'utf8mb4',
        nullable: true
    })
    version: string;

    @Index("ctime-idx")
    @Column({
        type: "bigint",
        name: "ctime"
    })
    ctime: string;
}
