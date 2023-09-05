"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Song_1 = require("../typeorm/entities/Song");
const dotenv = require("dotenv");
dotenv.config();
const databaseConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Song_1.Song],
    synchronize: true,
};
exports.default = databaseConfig;
//# sourceMappingURL=dbConfig.js.map