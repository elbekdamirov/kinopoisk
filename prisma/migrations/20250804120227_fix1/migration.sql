/*
  Warnings:

  - A unique constraint covering the columns `[genreId,moviesId]` on the table `movie_genre` will be added. If there are existing duplicate values, this will fail.
  - Made the column `moviesId` on table `movie_category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `moviesId` on table `movie_genre` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `movie_person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `countryId` on table `movies` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."PersonRole" AS ENUM ('actor', 'director', 'producer', 'writer', 'editor', 'cinematographer', 'composer', 'production_designer', 'costume_designer', 'visual_effects_supervisor');

-- DropForeignKey
ALTER TABLE "public"."movie_category" DROP CONSTRAINT "movie_category_moviesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."movie_genre" DROP CONSTRAINT "movie_genre_moviesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."movies" DROP CONSTRAINT "movies_countryId_fkey";

-- AlterTable
ALTER TABLE "public"."movie_category" ALTER COLUMN "moviesId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."movie_genre" ALTER COLUMN "moviesId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."movie_person" ADD COLUMN     "characterName" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "public"."PersonRole" NOT NULL;

-- AlterTable
ALTER TABLE "public"."movies" ALTER COLUMN "countryId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "movie_genre_genreId_moviesId_key" ON "public"."movie_genre"("genreId", "moviesId");

-- AddForeignKey
ALTER TABLE "public"."movies" ADD CONSTRAINT "movies_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."movie_category" ADD CONSTRAINT "movie_category_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "public"."movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."movie_genre" ADD CONSTRAINT "movie_genre_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "public"."movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
