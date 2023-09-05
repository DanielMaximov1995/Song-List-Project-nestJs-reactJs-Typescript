import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SongsService } from "./songs/services/songs.service"; // Import the SongsService

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 5000;

  await app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);

    // Initialize the SongsService to check and import data
    const songsService = app.get(SongsService);

    try {
      const isEmpty = await songsService.isSongTableEmpty();
      
      if (isEmpty) {
        await songsService.importDataFromCSV('src/utils/files/Song_list.csv');
      }
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  });
}

bootstrap();

