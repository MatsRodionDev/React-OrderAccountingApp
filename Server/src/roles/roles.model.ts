import { BelongsToMany, Column,  DataType,  Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs>{
    @Column({unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({unique: true, type: DataType.STRING, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User,() => UserRoles)
    users: User[];
}