import { PersonRole } from "generated/prisma";

export class CreateMoviePersonDto {
  personId: number;
  moviesId: number;
  role: PersonRole;
  characterName?: string;
}
