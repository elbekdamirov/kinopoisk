import { PartialType } from '@nestjs/swagger';
import { CreateMovieCategoryDto } from './create-movie-category.dto';

export class UpdateMovieCategoryDto extends PartialType(CreateMovieCategoryDto) {}
