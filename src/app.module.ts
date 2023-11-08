import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "node:path";
import { ormconfig } from "ormconfig";
import { ElectricMaterialResolver } from "~/graphql/resolvers/electric-material";
import { SupplierResolver } from "./graphql/resolvers/supplier";

@Module({
  imports: [
    SupplierResolver,
    ElectricMaterialResolver,
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      sortSchema: true,
      driver: ApolloDriver,
      playground: process.env.NODE_ENV === "development",
      autoSchemaFile: path.join(__dirname, "graphql", "schema.graphql"),
    }),
  ],
})
export class AppModule {}
