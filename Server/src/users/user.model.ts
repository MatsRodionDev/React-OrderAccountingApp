import { BelongsToMany, Column,  DataType,  Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

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

    @BelongsToMany(() => Role,() => UserRoles)
    roles: Role[];
}