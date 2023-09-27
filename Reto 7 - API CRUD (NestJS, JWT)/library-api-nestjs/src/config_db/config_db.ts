import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export class ConfigDb {
    static getOrmConfig(): TypeOrmModuleOptions {
      return {
        type: 'mysql',
        host: 'containers-us-west-66.railway.app',
        port: 6227,
        username: 'root',
        password: '47r7u3vNR7MinvFjbTdb',
        database: 'railway',
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      };
    }
  }