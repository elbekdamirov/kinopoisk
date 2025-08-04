export class CreateMovieFileDto {
  fileUrl: string;
  fileType: string;
  fileSize: number;
  quality: string;
  isPremium?: boolean;
  moviesId: number;
}
