import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async create(user: UserDto): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, user: UserUpdateDto): Promise<User> {
    try {
      user.id = id;
      await this.userRepository.update(id, user);
      return await this.userRepository.findOne(user.id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(id);
      console.log(result);
      return result.affected === 0 ? false : true;
    } catch (error) {
      throw error;
    }
  }
}
