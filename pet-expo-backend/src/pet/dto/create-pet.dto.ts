/* eslint-disable prettier/prettier */
import { Category } from "../schemas/book.schema";

export class CreatePetDto{
    readonly name:string;
    readonly description:string;
    readonly origin:string;
    readonly category: Category;
}