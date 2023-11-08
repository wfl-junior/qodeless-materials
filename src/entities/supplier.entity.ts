import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { ElectricMaterial } from "./electric-material.entity";

@ObjectType()
@Entity({ name: "suppliers" })
export class Supplier extends BaseEntity {
  @Field()
  @Column("text", { nullable: false, unique: true })
  name: string;

  @Field(() => [ElectricMaterial])
  @OneToMany(
    () => ElectricMaterial,
    electricMaterial => electricMaterial.supplier,
    { onDelete: "CASCADE" },
  )
  electricMaterials: ElectricMaterial[];
}
