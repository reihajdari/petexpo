/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './schemas/book.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  async getAllPets(@Query() query: ExpressQuery): Promise<Pet[]> {
    return this.petService.findAll(query);
  }

  @Post()
  async createPet(
    @Body()
    pet: CreatePetDto,
  ): Promise<Pet> {
    return this.petService.create(pet);
  }

  @Get(':id')
  async getPet(
    @Param('id')
    id: string,
  ): Promise<Pet> {
    return this.petService.findById(id);
  }

  @Put(':id')
  async updatePet(
    @Param('id') id: string,
    @Body() pet: UpdatePetDto,
  ): Promise<Pet> {
    return this.petService.updateById(id, pet);
  }

  @Delete(':id')
  async deletePet(
    @Param('id')
    id: string,
  ): Promise<Pet> {
    return this.petService.deleteById(id);
  }
}
