/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/book.schema';
import { Model, Document } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

import { Query } from 'express-serve-static-core';

type PetDocument = Pet & Document;

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name)
    private petModel: Model<PetDocument>,
  ) {}

  async findAll(query: Query): Promise<Pet[]> {
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    try {
      const pets = await this.petModel.find({ ...keyword }).exec();
      return pets;
    } catch (error) {
      throw new Error(`Could not fetch pets: ${error.message}`);
    }
  }

  async create(pet: CreatePetDto): Promise<Pet> {
    try {
      const createdPet = new this.petModel(pet);
      return await createdPet.save();
    } catch (error) {
      throw new Error(`Could not create pet: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).exec();

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async updateById(id: string, pet: UpdatePetDto): Promise<Pet> {
    const updatedPet = await this.petModel
      .findByIdAndUpdate(id, pet, {
        new: true,
      })
      .exec();

    if (!updatedPet) {
      throw new NotFoundException('Pet not found');
    }

    return updatedPet;
  }
  async deleteById(id: string): Promise<Pet> {
    return await this.petModel.findByIdAndDelete(id);
  }
}
