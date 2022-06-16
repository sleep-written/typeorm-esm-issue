# TypeORM ESM Issue

This project is a demostration of an issue encountered when you try to make a project using the TypeORM CLI. The problem occurs when you try to generate a migration and you have 2 entities with a one-to-many/many-to-one relation (declared in both entities):

### Command used:
```bash
npx typeorm-ts-node-esm -d src/data-source.ts migration:generate src/migrations/create-db
```

### Output:
```
Error during migration generation:
ReferenceError: Cannot access 'UserType' before initialization
```

But if you comment in both entities the relationship, the error doesn't appears.

## How to replicate the error

1. install dependencies:
    ```bash
    npm i
    ```
1. Configure your `"./sr/data-source.ts"` with the connection parameters of your mssql instance.

1. Execute this command:
    ```
    npx typeorm-ts-node-esm -d src/data-source.ts migration:generate src/migrations/create-db
    ```
    This command will launch [this error](#output).

## A possible cause

I found that if you edit both entities, commenting the file where the relationship is declared, that error no longer appears, and the migration is generated correctly:

`./src/entities/user.ts`
```ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { UserType } from './user-type.js';

@Entity({ name: 'User' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ type: 'varchar', length: 20 })
    nick: string;

    @Column({ type: 'varchar', length: 64 })
    pass: string;

    // Comment this
    // @ManyToOne(() => UserType, r => r.users)
    // userType: UserType;
}
```

`./src/entities/user-type.ts`
```ts
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

    // Comment this too
    // @OneToMany(() => User, r => r.userType)
    // users: User[];
}
```

Now if you try to generate the migration, this will be generated correctly, and if you try to run the migration, in this case it will works.