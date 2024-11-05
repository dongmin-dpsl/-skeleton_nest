import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
  ],
  controllers: [],
})
export class AppModule { }
