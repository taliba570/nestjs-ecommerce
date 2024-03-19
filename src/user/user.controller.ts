import { AuthorizeGuard } from './../utility/guards/authorization.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserEntity } from './entities/user.entity';
import { SignInDto } from './dto/signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Role } from 'src/utility/common/enums/Role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticationGuard)
  @Get('me')
  me(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<UserEntity> {
    return await this.userService.signup(signUpDto);
  }

  @Post('signin')
  async signin(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; user: UserEntity }> {
    const user = await this.userService.signIn(signInDto);
    const accessToken = await this.userService.accessToken(user);
    return { accessToken, user };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Role.ADMIN]))
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findOne(+id);
    if (!user)
      throw new NotFoundException(`User with the given Id ${id} doesn't exist`);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
