import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("shop_link")
export class ShopLink {

    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Index("player_id-idx")
    @Column({
        type: "bigint",
        name: "playerId"
    })
    playerId: number;

    @Column({
        type: "varchar",
        length: 64,
        name: "nickname",
        charset: 'utf8mb4'
    })
    nickname: string;

    @Column({
        type: "varchar",
        length: 64,
        name: "qid",
        charset: 'utf8mb4'
    })
    qid: string;

    @Column({
        type: "varchar",
        length: 64,
        name: "goodsName",
        charset: 'utf8mb4'
    })
    goodsName: string;

    @Column({
        type: "bigint",
        name: "money"
    })
    money: number;

    @Column({
        type: "varchar",
        length: 64,
        name: "payType",
        charset: 'utf8mb4'
    })
    payType: string;

    @Index('goodsId-idx')
    @Column({
        type: "bigint",
        name: "goodsId"
    })
    goodsId: number;

    @Index("createTime-idx")
    @Column({
        type: "bigint",
        name: "createTime"
    })
    createTime: number;

    @Column({
        type: "bigint",
        name: "pay_time",
        nullable: true
    })
    payTime: number;

    @Column({
        type: "tinyint",
        name: "getDay1",
        default: 0
    })
    getDay1: number;

    @Column({
        type: "tinyint",
        name: "getDay2",
        default: 0
    })
    getDay2: number;

    @Column({
        type: "tinyint",
        name: "getDay3",
        default: 0
    })
    getDay3: number;

    @Column({
        type: "bigint",
        name: "nextId",
        default: 0
    })
    nextId: number;

    @Index("payId-idx")
    @Column({
        type: "varchar",
        length: 64,
        name: "payId",
        charset: 'utf8mb4'
    })
    payId: string;

    @Index('status-idx')
    @Column({
        type: "tinyint",
        name: "status"
    })
    status: number;

    @Column({
        type: "json",
        name: "rewardItems",
        nullable: true
    })
    rewardItems: JSON;

    @Column({
        type: "tinyint",
        name: "idlock",
        default: 0
    })
    idlock: number;

    @Column({
        type: "json",
        name: "gameServerItem",
        nullable: true
    })
    gameServerItem: JSON;

    @Column({
        type: "json",
        name: "gameServerMsg",
        nullable: true
    })
    gameServerMsg: JSON;

    @Column({
        type: "varchar",
        length: 1024,
        name: "msgBefore",
        charset: 'utf8mb4',
        nullable: true
    })
    msgBefore: string;

    @Column({
        type: "varchar",
        length: 1024,
        name: "msgAfter",
        charset: 'utf8mb4',
        nullable: true
    })
    msgAfter: string;

    @Column({
        type: "json",
        name: "pay3Time",
        nullable: true
    })
    pay3Time: JSON;
}

