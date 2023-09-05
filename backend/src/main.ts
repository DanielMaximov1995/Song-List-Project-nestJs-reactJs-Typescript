import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  // Enable CORS for your application by setting the 'cors' option to true
  const app = await NestFactory.create(AppModule, { cors: true });

  // Use a global validation pipe to automatically validate incoming request data
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}

bootstrap();
