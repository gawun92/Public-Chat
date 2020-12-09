import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.chatCollec)
  currUser: User

  @Column({
    length: 1024,
  })
  name: string

  @Column({
    length: 1024,
  })
  text: string


}
