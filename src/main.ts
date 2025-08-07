import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/logging/winston.logging";
import { AllExceptionFilter } from "./common/errors/error.handling";

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.useGlobalFilters(new AllExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  app.setGlobalPrefix("api");
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AvtoService API")
    .setDescription("API hujjatlari")
    .setVersion("1.0")
    .addCookieAuth("refreshToken")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "token"
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  const PORT = config.get<number>("PORT");
  await app.listen(PORT ?? 3030, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api/docs`);
  });
}

start();
