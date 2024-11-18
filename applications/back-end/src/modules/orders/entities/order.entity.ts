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

import { StatusType } from '@boilerplate/types/orders/interfaces/orders'

import { OrderToProductEntity } from '@boilerplate/back-end/modules/orders/entities/order-to-product.entity'

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid', { nullable: true, default: null })
  userGid: string

  @Column({ nullable: true, default: null })
  firstName: string

  @Column({ nullable: true, default: null })
  lastName: string

  @Column({ nullable: true, default: null })
  phone: string

  @Column({ nullable: true, default: null })
  email: string

  @Column({ type: 'enum', enum: StatusType, nullable: true, default: StatusType.Pending })
  paymentStatus: StatusType

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
