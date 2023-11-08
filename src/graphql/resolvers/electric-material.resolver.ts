import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ElectricMaterial } from "~/entities/electric-material.entity";
import { CreateElectricMaterialInput } from "../graphql-types/create-electric-material-input";
import { UpdateElectricMaterialInput } from "../graphql-types/update-electric-material-input";

@Resolver(() => ElectricMaterial)
export class ElectricMaterialResolver {
  @Query(() => [ElectricMaterial])
  electricMaterials(): Promise<ElectricMaterial[]> {
    return ElectricMaterial.find({
      relationLoadStrategy: "join",
      relations: {
        supplier: true,
      },
    });
  }

  @Query(() => ElectricMaterial, { nullable: true })
  electricMaterial(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<ElectricMaterial | null> {
    return ElectricMaterial.findOne({
      where: { id },
      relationLoadStrategy: "join",
      relations: {
        supplier: true,
      },
    });
  }

  @Mutation(() => ElectricMaterial)
  createElectricMaterial(
    @Args("input", { type: () => CreateElectricMaterialInput })
    input: CreateElectricMaterialInput,
  ): Promise<ElectricMaterial> {
    return ElectricMaterial.create({
      name: input.name,
      supplierId: input.supplierId,
      quantityInStock: input.quantityInStock,
    }).save();
  }

  @Mutation(() => ElectricMaterial, { nullable: true })
  async updateElectricMaterial(
    @Args("id", { type: () => ID })
    id: string,
    @Args("input", { type: () => UpdateElectricMaterialInput })
    input: UpdateElectricMaterialInput,
  ): Promise<ElectricMaterial | null> {
    const electricMaterial = await ElectricMaterial.findOne({
      where: { id },
    });

    if (!electricMaterial) {
      return null;
    }

    Object.assign(electricMaterial, input);
    return electricMaterial.save();
  }

  @Mutation(() => Boolean)
  async deleteElectricMaterial(
    @Args("id", { type: () => ID })
    id: string,
  ): Promise<boolean> {
    try {
      await ElectricMaterial.delete(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
