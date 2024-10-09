import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private userRepository: typeof Role) {

    }

    async createRole(dto: CreateRoleDto){
        return await this.userRepository.create(dto);
    }

    async getRoleByValue(value: string){
        const role = await this.userRepository.findOne({ where: { value: value } })
        return role;
    }
}
