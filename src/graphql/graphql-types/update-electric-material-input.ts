import { Field, InputType } from "@nestjs/graphql";
import { Min, MinLength } from "class-validator";

@InputType()
export class UpdateElectricMaterialInput {
  @Field({ nullable: false })
  @MinLength(3, { message: "O nome deve conter no mínimo 3 caracteres" })
  name: string;

  @Field({ nullable: false })
  @Min(0, { message: "A quantidade em estoque não pode ser negativa" })
  quantityInStock: number;
}
