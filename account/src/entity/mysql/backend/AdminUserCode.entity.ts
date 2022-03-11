import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("admin_user_code")
export class AdminUserCode {
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Column({
        type: "bigint",
        nullable: false,
        name: "mobile",
    })
    mobile: number;

    @Column({
        type: "int",
        nullable: false,
        name: "code",
    })
    code: number;

    @Column({
        type: "int",
        nullable: false,
        name: "status",
    })
    status: number;

    @Column({
        type: "varchar",
        nullable: true,
        length: 64,
        name: "message",
        charset: 'utf8mb4'
    })
    message: string;

    @Column({
        type: "bigint",
        nullable: false,
        name: "past_time",
    })
    pastTime: number;

    @Column({
        type: "bigint",
        name: "create_time"
    })
    createTime: number;
}
