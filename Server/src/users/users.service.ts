import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) {

    }

    async createUser(dto: CreateUserDto) {
        const newUser = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USERUSER");
        await newUser.$set('roles', [role.id]);
        newUser.roles = [role];
        return newUser;
    }

    async getAll() {
        const users = await this.userRepository.findAll({include:{all: true}});
        return users;
    }

    async login(dto: LoginUserDto)
    {
        const user = await this.userRepository.findOne({ where: {email: dto.email}});

        if(!user)
        {
            
        }

        if(user.password != dto.password)
        {

        }

        return "token";
    }

    async getUserByEmail(email: string)
    {
        const user = await this.userRepository.findOne({ where: {email: email}, include: {all: true}});

        return user;
    }
}
