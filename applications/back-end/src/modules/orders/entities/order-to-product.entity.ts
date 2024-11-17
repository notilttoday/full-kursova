import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { OrderEntity } from '@boilerplate/back-end/modules/orders/entities/order.entity'
import { ProductEntity } from '@boilerplate/back-end/modules/products/entities/product.entity'

@Entity()
@Index(['orderId', 'productId'], { unique: true })
export class OrderToProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid')
  orderId: string

  @Index()
  @Column('uuid')
  productId: string

  @Column({ default: 1 })
  quantity: number

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Index()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date

  @ManyToOne(() => OrderEntity, (order) => order.toProducts)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity

  @ManyToOne(() => ProductEntity, (product) => product.toOrders)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity
}
