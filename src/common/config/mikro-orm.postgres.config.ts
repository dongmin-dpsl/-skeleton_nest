import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const postgresConfig: MikroOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => ({
    dbName: process.env.PG_DATABASE_NAME,
    host: process.env.PG_DATABASE_HOST,
    port: +process.env.PG_DATABASE_PORT,
    user: process.env.PG_DATABASE_USER,
    password: process.env.PG_DATABASE_PASSWORD,
    driver: PostgreSqlDriver,
    debug: true,
    autoLoadEntities: true,
    tsNode: true,
  }),
};
