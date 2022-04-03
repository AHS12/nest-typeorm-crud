import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async checkUserEmailExistsUpdate(
    id: number,
    email: string,
  ): Promise<boolean> {
    try {
      // const query = await this.userRepository.createQueryBuilder('user');
      // query.where('user.id != :id', { id });
      // query.andWhere('user.email = :email', { email });
      // console.log(query.getQuery());
      // const user = await query.getOne();
      // return user ? true : false;
      console.log('id inside service', id);
      console.log('email inside service', email);

      const user = await this.userRepository.findOne({
        where: { email: email, id: Not(id) },
      });
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
