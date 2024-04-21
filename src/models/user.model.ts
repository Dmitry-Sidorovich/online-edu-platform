import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Unique,
    Default
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(128))
    username!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(128))
    email!: string;

    @AllowNull(false)
    @Column(DataType.STRING(128))
    password!: string;

    @Default('user')
    @Column(DataType.STRING(128))
    role!: string;
}
