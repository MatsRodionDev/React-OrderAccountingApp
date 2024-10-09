import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import { User } from "./users/user.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    imports:[
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'Mats',
            password: 'Mats2005',
            database: 'AppDb',
            models: [User, Role, UserRoles],
            autoLoadModels: true,
            synchronize: true
          }),
        UsersModule,
        RolesModule,
        AuthModule]
})
export class AppModule {}