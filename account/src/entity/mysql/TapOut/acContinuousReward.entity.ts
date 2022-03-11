import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("ac_continuous_reward", { schema: "tapout_pro" })
export class AcContinuousReward {

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

    @Index('rewardId-idx')
    @Column({
        type: "bigint",
        name: "rewardId"
    })
    rewardId: number;

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

    @Index("gold-idx")
    @Column({
        type: "bigint",
        name: "gold",
        default: 0
    })
    gold: number;

    @Index("redBag-idx")
    @Column({
        type: "bigint",
        name: "redBag",
        default: 0
    })
    redBag: number;

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
}

