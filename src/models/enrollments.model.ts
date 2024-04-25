import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Courses } from './courses.model';

@Table({
  tableName: 'enrollments',
  timestamps: true,
})
export class Enrollments extends Model<Enrollments> {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  studentId: number;

  @AllowNull(false)
  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  courseId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: 'pending', // Values: 'pending', 'active', 'completed'
  })
  status: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: 'read', // Values: 'read', 'write'
  })
  accessLevel: string;

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;
}
