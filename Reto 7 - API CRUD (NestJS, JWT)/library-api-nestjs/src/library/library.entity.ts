import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Se especifica el título de la obra' })
  @Column()
  title?: string;

  @ApiProperty({ example: 'Se especifica el género de la obra' })
  @Column()
  genre?: string;

  @ApiProperty({
    example: 'Se describe la obra/libro',
  })
  @Column('text')
  description?: string;

  @ApiProperty({ example: 'Autor del libro' })
  @Column()
  author?: string;

  @ApiProperty({ example: 'Editora' })
  @Column()
  publisher?: string;

  @ApiProperty({ example: 'Cantidad de páginas del libro' })
  @Column()
  pages?: number;

  @ApiProperty({ example: 'Imagen de la portada' })
  @Column()
  image_url?: string;
}
