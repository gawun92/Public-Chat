import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 1024,
  })
  name: string

  @Column({ nullable: true })
  data: string
}
