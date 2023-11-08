import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Supplier } from "./supplier.entity";

@ObjectType()
@Entity({ name: "electric_materials" })
export class ElectricMaterial extends BaseEntity {
  @Field({ nullable: false })
  @Column("text", { nullable: false, unique: true })
  name: string;

  @Field({ nullable: false })
  @Column("integer", { nullable: false })
  quantityInStock: number;

  @Field({ nullable: false })
  @Column("uuid", { nullable: false })
  supplierId: string;

  @Field(() => Supplier, { nullable: true })
  @JoinColumn({ name: "supplierId" })
  @ManyToOne(() => Supplier, supplier => supplier.electricMaterials, {
    onDelete: "CASCADE",
  })
  supplier: Supplier;
}
