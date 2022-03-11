import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity("mail")
export class MailEntity {
    @Index("id-idx")
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Index("create_time-idx")
    @Column({
        type: "bigint",
        name: "create_time"
    })
    createTime: number;

    @Column({
        type: "bigint",
        name: "send_uid",
        nullable: true
    })
    sendUid: number;

    @Column({
        type: "varchar",
        length: 255,
        name: "send_user_name",
        charset: 'utf8mb4',
        nullable: true
    })
    sendUserName: string;

    @Index("receive_uid-idx")
    @Column({
        type: "bigint",
        name: "receive_uid"
    })
    receiveUid: number;

    @Column({
        type: "varchar",
        length: 255,
        name: "receive_user_name",
        charset: 'utf8mb4',
        nullable: true
    })
    receiveUserName: string;

    @Column({
        type: "bigint",
        name: "tmplId",
    })
    tmplId: number;

    @Column({
        type: "varchar",
        length: 1024,
        name: "content",
        charset: 'utf8mb4',
        nullable: true
    })
    content: string;

    @Column({
        type: "varchar",
        length: 1024,
        charset: 'utf8mb4',
        name: "attachment"
    })
    attachment: string;

    @Column({
        type: "tinyint",
        name: "status"
    })
    status: number;

    @Index("type-idx")
    @Column({
        type: "tinyint",
        name: "type"
    })
    type: number;

    @Index("target_type-idx")
    @Column({
        type: "tinyint",
        name: "target_type"
    })
    targetType: number;

    @Index("mobile-idx")
    @Column({
        type: "bigint",
        name: "mobile",
        nullable: true
    })
    mobile: number;
}

