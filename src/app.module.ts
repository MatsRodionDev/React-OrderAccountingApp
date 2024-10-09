import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import { User } from "./users/user.model";

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
            models: [User],
            autoLoadModels: true,
            synchronize: true
          }),
        UsersModule]
})
export class AppModule {}