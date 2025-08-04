import { PartialType } from "@nestjs/swagger";
import { CreateMovieGenreDto } from "./create-movie-genre.dto";

export class UpdateMovieGenreDto extends PartialType(CreateMovieGenreDto) {}
