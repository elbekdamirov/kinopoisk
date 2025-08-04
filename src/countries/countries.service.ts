import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CountriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCountryDto: CreateCountryDto) {
    return this.prisma.country.create({ data: createCountryDto });
  }

  findAll() {
    return this.prisma.country.findMany({
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: number) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    await this.findOne(id);

    return this.prisma.country.update({
      where: { id },
      data: updateCountryDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.country.delete({
      where: { id },
    });
  }
}
