import {  HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService){}

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto);

        return await this.generateToken(user);
    }

    async register(userDto: CreateUserDto){
       const candidate = await this.userService.getUserByEmail(userDto.email);

       if(candidate)
       {
            throw new HttpException('Пользователь с таки email уже существует', HttpStatus.BAD_REQUEST);
       }

       const hashPassword = await bcrypt.hash(userDto.password, 5);

       const user = await this.userService.createUser({...userDto, password: hashPassword});

       return await this.generateToken(user);
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto)
    {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEqual = await bcrypt.compare(userDto.password, user.password);

        if(user && passwordEqual){
            return user
        }

        throw new UnauthorizedException({message: 'Некорректный логин или пароль.'})
    }
}
