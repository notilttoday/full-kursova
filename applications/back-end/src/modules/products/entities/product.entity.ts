import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { GameType } from '@boilerplate/types/products/interfaces/products'

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  description: string

  @Column()
  price: number

  @Column({ type: 'enum', enum: GameType, nullable: true })
  game: GameType

  @Column({ type: 'text', nullable: true })
  imagePath: string

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Index()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date
}
