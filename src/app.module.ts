import { UserModule } from './user/user.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
//import { typeOrmconfigAsync } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: configService.get('DB_SYNC'),
        // logging: configService.get('DB_LOGGING'),
        // logger: configService.get('DB_LOGGER'),
        //migrations: [__dirname + '/../**/*.migration{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*.js'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    //TypeOrmModule.forRoot(typeOrmconfigAsync),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
