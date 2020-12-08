import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class BadWordPattern extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.usedBadWords)
  badUser: User

  @Column({
    length: 1024,
  })
  name: string

  @Column({
    length: 1024,
  })
  pattern: string

}
