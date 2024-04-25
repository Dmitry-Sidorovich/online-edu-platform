import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Assignments } from './assignments.model';

@Table({
  tableName: 'submissions',
})
export class Submissions extends Model<Submissions> {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Assignments)
  @Column(DataType.INTEGER.UNSIGNED)
  assignmentId: number;

  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column(DataType.INTEGER.UNSIGNED)
  studentId: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;
}
