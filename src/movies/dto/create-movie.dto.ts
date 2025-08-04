export class CreateMovieDto {
  title: string;
  description?: string;
  releaseDate: Date;
  duration: string;
  ageRating?: string;
  posterUrl?: string;
  trailerUrl?: string;
  is_premium?: boolean;
  countryId: number;
}
