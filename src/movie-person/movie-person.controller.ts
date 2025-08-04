import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviePersonService } from './movie-person.service';
import { CreateMoviePersonDto } from './dto/create-movie-person.dto';
import { UpdateMoviePersonDto } from './dto/update-movie-person.dto';

@Controller('movie-person')
export class MoviePersonController {
  constructor(private readonly moviePersonService: MoviePersonService) {}

  @Post()
  create(@Body() createMoviePersonDto: CreateMoviePersonDto) {
    return this.moviePersonService.create(createMoviePersonDto);
  }

  @Get()
  findAll() {
    return this.moviePersonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviePersonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoviePersonDto: UpdateMoviePersonDto) {
    return this.moviePersonService.update(+id, updateMoviePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviePersonService.remove(+id);
  }
}
