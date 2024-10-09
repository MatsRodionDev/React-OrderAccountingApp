import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post("register")
    register(@Body() userDto: CreateUserDto)
    {
        return this.userService.createUser(userDto);
    }

    @Post("login")
    login(@Body() userDto: LoginUserDto)
    {
        return this.userService.login(userDto);
    }

    @Roles('USERUSER')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAll();
    }
}
