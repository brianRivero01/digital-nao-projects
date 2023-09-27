import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { Book } from './library.entity';

describe('BooksController', () => {
  let controller: LibraryController;
  let service: LibraryService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Book>; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [
        LibraryService,
        {
          provide: getRepositoryToken(Book), 
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LibraryService>(LibraryService);
    repository = module.get<Repository<Book>>(getRepositoryToken(Book));
    controller = module.get<LibraryController>(LibraryController);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const expectedResult: Book[] = [
        { "id": 1,
          "title": "Una historia de España",
          "genre": "Historia",
          "description": "Un relato ameno, personal, a ratos irónico, pero siempre único, de nuestra accidentada historia a través de los siglos. Una obra concebida por el autor para, en palabras suyas, «divertirme, releer y disfrutar; un pretexto para mirar atrás desde los tiempos remotos hasta el presente, reflexionar un poco sobre ello y contarlo por escrito de una manera poco ortodoxa."
        },
        { "id": 3,
          "title": "El arte de la guerra",
          "genre": "Ensayo",
          "description": "Un tratado militar escrito por Sun Tzu, un antiguo estratega militar chino.",
          "author": "Sun Tzu",
          "publisher": "Penguin Classics",
          "pages": 160,
          "image_url": "https://images-na.ssl-images-amazon.com/images/I/51QhmRwvEQL._SX323_BO1,204,203,200_.jpg" },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult); 
      
      const books = await controller.findAll();
      
      expect(books).toBe(expectedResult);
    });
  });

  describe('findBook', () => {
    it('should return a book by ID', async () => {
      const bookId = 3;
      const result: Book = new Book();
      jest.spyOn(service, 'findBook').mockResolvedValue(result);

      const book = await controller.findBook(bookId);

      expect(book).toBe(result);
    });
  });


});