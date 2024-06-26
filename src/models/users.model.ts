import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class Users extends Model<Users> {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER.UNSIGNED)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(128))
  username: string;

  @AllowNull(true)
  @Unique
  @Column(DataType.STRING(255))
  email: string;

  @AllowNull(true)
  @Column(DataType.STRING(255))
  password: string;

  @AllowNull(false)
  @Default('student')
  @Column(DataType.STRING(128))
  role: string;

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @AllowNull(true)
  @Column(DataType.STRING(128))
  githubId?: string | null;

  @AllowNull(true)
  @Column(DataType.TEXT)
  salt: string | null; // Соль для пароля

  @AllowNull(true)
  @Column(DataType.TEXT)
  passwordHashPart1: string | null; // Часть 1 хеша пароля

  @AllowNull(true)
  @Column(DataType.TEXT)
  passwordHashPart2: string | null; // Часть 2 хеша пароля

  @AllowNull(true)
  @Column(DataType.TEXT)
  proof: string | null; // Для хранения результатов верификации
}
