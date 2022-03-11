import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity("mail_exchange")
export class MailExchange {
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

    @Index("payId-idx")
    @Column({
        type: "varchar",
        length: 255,
        name: "payId",
        charset: 'utf8mb4',
    })
    payId: string;

    @Column({
        type: "tinyint",
        name: "status"
    })
    status: number;

    @Column({
        type: "varchar",
        length: 64,
        name: "goodsName",
        charset: 'utf8mb4',
        nullable: true
    })
    goodsName: string;

    @Column({
        type: "int",
        name: "exchangeNum"
    })
    exchangeNum: string;

    @Column({
        type: "varchar",
        length: 64,
        name: "fullName"
    })
    fullName: string;

    @Column({
        type: "varchar",
        length: 64,
        name: "iDcardNo",
        charset: 'utf8mb4'
    })
    iDcardNo: string;

    @Column({
        type: "varchar",
        length: 64,
        name: "address",
        charset: 'utf8mb4'
    })
    address: string;

    @Column({
        type: "bigint",
        name: "phone",
    })
    phone: string;

    @Column({
        type: "varchar",
        length: 64,
        name: "mailType"
    })
    mailType: number;

    @Column({
        type: "varchar",
        length: 64,
        name: "mailId",
        charset: 'utf8mb4'
    })
    mailId: string;
}
