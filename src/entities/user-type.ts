import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.js';

@Entity({ name: 'UserType' })
export class UserType extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'tinyint' })
    id: number;

    @Column({ type: 'varchar', length: 20 })
    cod: string;

    @Column({ type: 'varchar', length: 100 })
    desc: string;

    @OneToMany(() => User, r => r.userType)
    users: User[];
}