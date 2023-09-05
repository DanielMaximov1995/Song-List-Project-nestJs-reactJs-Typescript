"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const songs_service_1 = require("./songs/services/songs.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const port = process.env.PORT || 5000;
    await app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
        const songsService = app.get(songs_service_1.SongsService);
        try {
            const isEmpty = await songsService.isSongTableEmpty();
            if (isEmpty) {
                await songsService.importDataFromCSV('src/utils/files/Song_list.csv');
            }
        }
        catch (error) {
            console.error('Error during initialization:', error);
        }
    });
}
bootstrap();
//# sourceMappingURL=main.js.map