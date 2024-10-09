import { Column,  DataType,  Model, PrimaryKey, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
    @Column({unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({unique: true, type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}