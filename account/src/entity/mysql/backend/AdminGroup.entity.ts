import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("admin_group")
export class AdminGroup {
    @PrimaryGeneratedColumn({
        type: "bigint",
        unsigned: true,
        name: "id"
    })
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
        length: 32,
        name: "groupName",
        charset: 'utf8mb4'
    })
    groupName: string;

    @Column({
        type: "varchar",
        nullable: false,
        length: 255,
        name: "access",
        charset: 'utf8mb4'
    })
    access: string;
}
