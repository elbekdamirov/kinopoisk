import { PartialType } from '@nestjs/swagger';
import { CreateMoviePersonDto } from './create-movie-person.dto';

export class UpdateMoviePersonDto extends PartialType(CreateMoviePersonDto) {}
