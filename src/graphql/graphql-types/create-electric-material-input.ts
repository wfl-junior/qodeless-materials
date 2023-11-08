import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, Min, MinLength } from "class-validator";

@InputType()
export class CreateElectricMaterialInput {
  @Field({ nullable: false })
  @MinLength(3, { message: "O nome deve conter no mínimo 3 caracteres" })
  name: string;

  @Field({ nullable: false })
  @Min(0, { message: "A quantidade em estoque não pode ser negativa" })
  quantityInStock: number;

  @Field({ nullable: false })
  @IsUUID("4")
  supplierId: string;
}
