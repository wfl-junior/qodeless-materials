import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Supplier } from "~/entities/supplier.entity";
import { CreateSupplierInput } from "../graphql-types/create-supplier-input";
import { UpdateSupplierInput } from "../graphql-types/update-supplier-input";

@Resolver(() => Supplier)
export class SupplierResolver {
  @Query(() => [Supplier])
  suppliers(): Promise<Supplier[]> {
    return Supplier.find({
      relationLoadStrategy: "join",
      relations: {
        electricMaterials: true,
      },
    });
  }

  @Query(() => Supplier, { nullable: true })
  supplier(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Supplier | null> {
    return Supplier.findOne({
      where: { id },
      relationLoadStrategy: "join",
      relations: {
        electricMaterials: true,
      },
    });
  }

  @Mutation(() => Supplier)
  createSupplier(
    @Args("input", { type: () => CreateSupplierInput })
    input: CreateSupplierInput,
  ): Promise<Supplier> {
    return Supplier.create({ name: input.name }).save();
  }

  @Mutation(() => Supplier, { nullable: true })
  async updateSupplier(
    @Args("id", { type: () => ID })
    id: string,
    @Args("input", { type: () => UpdateSupplierInput })
    input: UpdateSupplierInput,
  ): Promise<Supplier | null> {
    const supplier = await Supplier.findOne({
      where: { id },
    });

    if (!supplier) {
      return null;
    }

    Object.assign(supplier, input);
    return supplier.save();
  }

  @Mutation(() => Boolean)
  async deleteSupplier(
    @Args("id", { type: () => ID })
    id: string,
  ): Promise<boolean> {
    try {
      await Supplier.delete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
