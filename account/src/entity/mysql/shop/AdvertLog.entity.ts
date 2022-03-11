import {Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("advertlog")
export class AdvertLog {
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Index("uid-idx")
    @Column({
        type: "bigint",
        name: "uid"
    })
    uid: number;

    @Index("createTime-idx")
    @Column({
        type: "bigint",
        name: "create_time"
    })
    createTime: number;

    @Column({
        type: "int",
        name: "advertId",
        default: 0
    })
    advertId: number;
}
