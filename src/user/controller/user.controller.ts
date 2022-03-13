import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ResponseInterface from '../../interface/response.interface';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('UserController constructor');
  }

  @Get()
  async getUsers(): Promise<ResponseInterface> {
    console.log('UserController getUsers');
    const users = await this.userService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      data: users,
    };
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<ResponseInterface> {
    console.log('UserController getUser');
    console.log(id);

    const user = await this.userService.findOne(id);

    console.log(user);

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data: user,
    };
  }

  @Post('/create')
  //async createUser(@Body() user: User): Promise<ResponseInterface> {
  async createUser(@Body() data: UserDto): Promise<ResponseInterface> {
    console.log('UserController createUser');

    console.log(data);

    const newUser = await this.userService.create(data);

    console.log(newUser);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserUpdateDto,
  ): Promise<ResponseInterface> {
    console.log('UserController updateUser');
    console.log(id);
    console.log(user);

    const updatedUser = await this.userService.update(id, user);
    console.log(updatedUser);

    if (!updatedUser) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<ResponseInterface> {
    console.log('UserController deleteUser');
    console.log(id);

    const isDeleted = await this.userService.delete(id);
    if (!isDeleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User Not Found',
      };
    }

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'User Deleted successfully',
    };
  }
}
