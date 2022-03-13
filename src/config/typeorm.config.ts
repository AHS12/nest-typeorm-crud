/* eslint-disable */

import { ConnectionOptions, DatabaseType } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ...

// Check typeORM documentation for more information.

//checking database type
let databaseType: DatabaseType = 'mysql';

console.log(databaseType);

//load env variables
const configService = new ConfigService();
const dbType = configService.get('DB_TYPE');
console.log('dbtype',dbType);

switch (process.env.DB_TYPE) {
    case 'mysql':
        databaseType = 'mysql';
        break;
    case 'postgres':
        databaseType = 'postgres';
        break;
    case 'mariadb':
        databaseType = 'mariadb';
        break;
    default:
        databaseType = 'mysql';
}

//setting sync option for database
const appEnvirnoment = process.env.APP_ENV || 'prod';
let shouldDbSync = false;
if (appEnvirnoment === 'dev') {
    shouldDbSync = true;
} else {
    shouldDbSync = false;
}

console.log('shouldDbSync', shouldDbSync);



export const typeOrmconfig: ConnectionOptions = {
    type: databaseType,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_Password,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],

    //If We are using migrations, synchronize should be set to false.
    //Setting synchronize: true shouldn't be used in production - otherwise we can lose production data.

    synchronize: shouldDbSync,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    //migrationsRun: true,
    logging: true,
    logger: 'file',

    // allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
};


console.log('config', typeOrmconfig);


//export = typeOrmconfig;