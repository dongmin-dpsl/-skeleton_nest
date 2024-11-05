import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    MikroOrmModule.forRootAsync(postgresConfig),
  ],
  controllers: [],
})
export class AppModule { }
