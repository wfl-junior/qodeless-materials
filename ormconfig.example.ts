import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import path from "node:path";

export const ormconfig: TypeOrmModuleOptions = {
  type: "better-sqlite3",
  database: path.join(__dirname, "..", "database.sqlite"),
  entities: [path.join(__dirname, "src", "entities", "*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "src", "migrations", "*{.ts,.js}")],
  synchronize: true,
  logging: false,
};
