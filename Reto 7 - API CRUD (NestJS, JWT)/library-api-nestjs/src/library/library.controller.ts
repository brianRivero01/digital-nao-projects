import { Body, Controller, Post, Get, ParseIntPipe, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { LibraryService } from './library.service';
import { Book } from './library.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('books') 
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('library')
export class LibraryController {

    constructor(private libraryService: LibraryService){}

    @Get()
    @ApiOperation({ summary: 'Obtener lista de libros' }) 
    @ApiResponse({ 
        status: 201,
        description: 'Lista de libros',
        type: Book, 
    })
    findAll(){
        return this.libraryService.findAll()
    }

    @Get(':bookId')
    @ApiOperation({ summary: 'Obtener libro por ID' })
    @ApiResponse({
        status: 201,
        description: 'Libro en específico ubicado por ID',
        type: Book,
    })
    findBook(@Param('id', ParseIntPipe) id: number):
    Promise<Book> {
        return this.libraryService.findBook(id)
    }

    @Patch(':id')
    updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: Book){
        return this.libraryService.updateBook(id,book)
    }

    @Post()
    createBook(@Body() newBook: Book){
        return this.libraryService.createBook(newBook)
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number){
        return this.libraryService.deleteBook(id)
    }
}
