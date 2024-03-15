import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<UserEntity> {
    const userExist = await this.findUserByEmail(signUpDto.email);
    if (userExist) throw new BadRequestException('User already exist!');
    let user = this.userRepository.create(signUpDto);
    user = await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: signInDto.email })
      .getOne();
    if (!user) throw new BadRequestException('Bad credentials!');
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new BadRequestException('Bad credentials!');
    delete user.password;
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: any): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN },
    );
  }
}
