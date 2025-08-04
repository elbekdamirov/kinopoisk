import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { CountriesModule } from './countries/countries.module';
import { CategoriesModule } from './categories/categories.module';
import { MovieCategoryModule } from './movie-category/movie-category.module';
import { GenresModule } from './genres/genres.module';
import { MovieGenresModule } from './movie-genres/movie-genres.module';
import { MovieFilesModule } from './movie-files/movie-files.module';
import { MoviesModule } from './movies/movies.module';
import { PersonsModule } from './persons/persons.module';
import { MoviePersonModule } from './movie-person/movie-person.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    UsersModule,
    PrismaModule,
    AdminModule,
    AuthModule,
    MailModule,
    CountriesModule,
    CategoriesModule,
    MovieCategoryModule,
    GenresModule,
    MovieGenresModule,
    MovieFilesModule,
    MoviesModule,
    PersonsModule,
    MoviePersonModule,
    NotificationsModule,
    BookmarksModule,
    RatingsModule,
    CommentsModule,
    SubscriptionsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
