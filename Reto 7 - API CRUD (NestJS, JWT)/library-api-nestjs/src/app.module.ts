import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryModule } from './library/library.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDb } from './config_db/config_db';
import { Book } from './library/library.entity';
import { LibraryController } from './library/library.controller';
import { LibraryService } from './library/library.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigDb.getOrmConfig()), 
    TypeOrmModule.forFeature([Book]),
    LibraryModule
  ],
  controllers: [AppController,LibraryController],
  providers: [AppService,LibraryService],
})
export class AppModule {}
