import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateSupplierInput {
  @Field({ nullable: false })
  @MinLength(3, { message: "O nome deve conter no mínimo 3 caracteres" })
  name: string;
}
