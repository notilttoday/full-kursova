import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { OrderToProductEntity } from '@boilerplate/back-end/modules/orders/entities/order-to-product.entity'

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid', { nullable: true, default: null })
  userGid: string

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Index()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date

  @OneToMany(() => OrderToProductEntity, (orderToProduct) => orderToProduct.order)
  toProducts: OrderToProductEntity[]
}
