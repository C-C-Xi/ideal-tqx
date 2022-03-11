import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("shop")
export class Shop {

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

    @Index("payTime-idx")
    @Column({
        type: "bigint",
        name: "pay_time",
        default: 0
    })
    payTime: number;

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

    @Index('status-idx')
    @Column({
        type: "tinyint",
        name: "status"
    })
    status: number;

    @Index('goodsId-idx')
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

    @Index("money-idx")
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

    @Index("gainItemType-idx")
    @Column({
        type: "int",
        name: "gainItemType",
        default: 0
    })
    gainItemType: number;

    @Index("gold-idx")
    @Column({
        type: "bigint",
        name: "gold",
        default: 0
    })
    gold: number;

    @Index("ap-idx")
    @Column({
        type: "bigint",
        name: "ap",
        default: 0
    })
    ap: number;

    @Index("stone-idx")
    @Column({
        type: "bigint",
        name: "stone",
        default: 0
    })
    stone: number;

    @Index("redBag-idx")
    @Column({
        type: "bigint",
        name: "redBag",
        default: 0
    })
    redBag: number;

    @Index("drawsymbol-idx")
    @Column({
        type: "int",
        name: "drawsymbol",
        default: 0
    })
    drawsymbol: number;

    @Column({
        type: "bigint",
        name: "addLotteryPoolGold",
        default: 0
    })
    addLotteryPoolGold: number;

    @Column({
        type: "bigint",
        name: "lotteryId",
        default: 0
    })
    lotteryId: number;

    @Column({
        type: "varchar",
        length: 64,
        name: "transOrderId",
        charset: 'utf8mb4',
        default: ''
    })
    transOrderId: string;

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
        name: "rewardItems",
        nullable: true
    })
    rewardItems: JSON;

    @Column({
        type: "json",
        name: "freeGift",
        nullable: true
    })
    freeGift: JSON;

    @Column({
        type: "int",
        name: "tabType",
        nullable: true
    })
    tabType: number;
}
