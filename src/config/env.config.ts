import { ConfigModuleOptions } from "@nestjs/config";

export const envConfig: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: `env/.${process.env.NODE_ENV === undefined ? 'local' : process.env.NODE_ENV}.env`
}