import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Chat } from './Chat'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Chat, chat => chat.currUser)
  @JoinTable()
  chatCollec: Chat[]

  @Column({
    length: 100,
    default: '',
  })
  email: string

  @Column({
    default: 3,
  })
  timestap_last: number

  @Column({
    length: 5,
    default: '',
  })
  password: string

  @Column({
    default: 0,
  })
  num_improper: number

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    default: true,
  })
  online_status: boolean

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date


}
