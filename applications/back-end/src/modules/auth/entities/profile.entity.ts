import { Column, CreateDateColumn, Entity, Index, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Role } from '@boilerplate/core/interfaces/user'
import { ContactMessageEntity } from 'src/modules/contact-message/entities/contact-message.entity'

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.User] })
  roles: Role[]

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @OneToMany(() => ContactMessageEntity, (contactMessage) => contactMessage.message)
  @JoinTable()
  contactMessage: ContactMessageEntity
}
