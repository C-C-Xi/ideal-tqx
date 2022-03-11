import {  Column, Entity, Index,  PrimaryGeneratedColumn } from "typeorm";

@Entity("shop_exchange")
export class ShopExchange {
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Index("player_id-idx")
    @Column({
        type: "bigint",
        name: "player_id"
    })
    playerId: number;

    @Index("createTime-idx")
    @Column({
        type: "bigint",
        name: "create_time"
    })
    createTime: number;

    @Column({
        type: "varchar",
        length: 1024,
        name: "msg",
        charset: 'utf8mb4'
    })
    msg: string;

    @Column({
        type: "varchar",
        length: 1024,
        name: "game_server_msg",
        charset: 'utf8mb4',
        nullable: true
    })
    gameServerMsg: string;

    @Index("payId-idx")
    @Column({
        type: "varchar",
        length: 64,
        name: "payId",
        charset: 'utf8mb4'
    })
    payId: string;

    @Column({
        type: "tinyint",
        name: "status"
    })
    status: number;

    @Column({
        type: "tinyint",
        name: "tabType"
    })
    tabType: number;

    @Column({
        type: "bigint",
        name: "goods_id"
    })
    goodsId: number;

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
        name: "goods_name",
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
        name: "pay_type",
        charset: 'utf8mb4'
    })
    payType: string;

    @Column({
        type: "bigint",
        name: "gold",
        nullable: true
    })
    gold: number;

    @Column({
        type: "float",
        name: "redBag200",
        nullable: true
    })
    redBag200: number;

    @Column({
        type: "bigint",
        name: "ap",
        nullable: true
    })
    ap: number;

    @Column({
        type: "bigint",
        name: "stone",
        nullable: true
    })
    stone: number;

    @Index('red_bag-idx')
    @Column({
        type: "float",
        name: "red_bag",
        nullable: true
    })
    redBag: number;

    @Index('red_bag_status-idx')
    @Column({
        type: "tinyint",
        name: "red_bag_status"
    })
    redBagStatus: number;

    @Column({
        type: "tinyint",
        name: "vip",
        default: 0
    })
    vip: number;

    @Column({
        type: "tinyint",
        name: "idlock",
        default: 0
    })
    idlock: number;

    @Column({
        type: "varchar",
        length: 1024,
        name: "wechat_server_msg",
        charset: 'utf8mb4',
        nullable: true
    })
    wechatServerMsg: string;

    @Column({
        type: "tinyint",
        name: "integral",
        default: 0
    })
    integral: number;
}
