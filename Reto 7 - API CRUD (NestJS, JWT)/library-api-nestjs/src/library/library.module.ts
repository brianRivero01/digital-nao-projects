import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './library.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([Book]),
  AuthModule],
  controllers: [LibraryController],
  providers: [LibraryService],
})
export class LibraryModule {}
