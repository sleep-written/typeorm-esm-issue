# TypeORM ESM Issue

This project is a demostration of an issue encountered when you try to make a project in __ESM__ with typeORM. The problem occurs when you try to generate a migration and you have 2 entities with a one-to-many/many-to-one relation (declared in both entities).

In this branch `"commonjs"`, the project is setted as a __CommonJS__ type, so if you execute this command:
```bash
npx typeorm-ts-node-commonjs -d src/data-source.ts migration:generate src/migrations/create-db
```
...the typeORM cli is capable to generate without problems the migration. This demostrates that the problem to generate migrations with entities with relations only occurs in __ESM__ projects.