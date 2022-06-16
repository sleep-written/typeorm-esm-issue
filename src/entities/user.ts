import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { UserType } from './user-type';

@Entity({ name: 'User' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number

    @Column({ type: 'varchar', length: 20 })
    nick!: string;

    @Column({ type: 'varchar', length: 64 })
    pass!: string;

    @ManyToOne(() => UserType, r => r.users)
    userType!: UserType;
}
