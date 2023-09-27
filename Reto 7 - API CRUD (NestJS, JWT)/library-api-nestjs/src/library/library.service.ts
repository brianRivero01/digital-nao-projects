import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './library.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  findAll(){
    return this.bookRepository.find();
  }

  findBook(id: number){
    return this.bookRepository.findOne({
      where: {
        id,
      }
    })
  }

  updateBook(id: number, book: Book){
    return this.bookRepository.update( { id }, book)
  }

  createBook(book: Book){
    const newBook = this.bookRepository.create(book)
    return this.bookRepository.save(newBook)
  }

  deleteBook(id: number){
    return this.bookRepository.delete({ id });
  }

}
