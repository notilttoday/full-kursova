import { ProfileEntity } from 'src/modules/auth/entities/profile.entity'
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ContactMessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column('text')
  message: string

  @Column()
  userId: string

  @ManyToOne(() => ProfileEntity, (profile) => profile.contactMessage)
  profile: ProfileEntity

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
