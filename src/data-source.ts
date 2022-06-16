import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'test',
    password: 'test',
    database: 'test',
    logging: false,
    entities: ['src/entities/*.ts'],
    migrations: ['src/migrations/*.ts'],
    options: {
        encrypt: false
    }
})
