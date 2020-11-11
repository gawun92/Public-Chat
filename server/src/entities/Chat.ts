import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 1024,
  })
  name: string

  @Column({
    length: 1024,
  })
  text: string
}
