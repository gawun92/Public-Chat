import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BadWordPattern extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 1024,
  })
  name: string

  @Column({
    length: 1024,
  })
  pattern: string
}
