import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Get,
  Req,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import {
  AthorizedUseCase,
  ChangePassowrd,
  EditUser,
  EditUserParams,
  GetAllUsers,
  GetUser,
  GetUserParams,
  Login,
  RecoverPassowrd,
  RegisterUser,
  ResetPassowrd,
  TokenInfo,
  User,
} from '../core/auth';
import { TypeOrmUserRepository } from 'src/db/typeorm-user-repository.service';
import { CryptographyBcryptService } from 'src/cryptography/cryptography-bcrypt.service';
import { HasherJWTService } from 'src/hasher/hasher-jwt.service';
import { NodeMailEmailService } from 'src/email/email.service';
import {
  getAuthorizationHeader,
  mapException,
} from 'src/utils/nest-reponse-utils';
import {
  ChangePasswordDTO,
  EditUserDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
} from './DTO/auth.DTOs';
import { TypeOrmGroupRepository } from 'src/db/typeorm-group-repository.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRepository: TypeOrmUserRepository,
    private readonly groupRepository: TypeOrmGroupRepository,
    private readonly cryptographyService: CryptographyBcryptService,
    private readonly hasherService: HasherJWTService<TokenInfo>,
    private readonly emailService: NodeMailEmailService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() params: RegisterDTO) {
    try {
      const useCase = new RegisterUser(
        this.userRepository,
        this.cryptographyService,
      );
      const user = await useCase.handle({
        email: params.email,
        password: params.password,
        name: params.name,
        confirmPassword: params.confirmPassword,
        phoneNumber: params.phoneNumber,
      });
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() LoginDTO: LoginDTO) {
    try {
      const useCase = new Login(
        this.userRepository,
        this.cryptographyService,
        this.hasherService,
      );
      return await useCase.handle({
        email: LoginDTO.email,
        password: LoginDTO.password,
      });
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('change-password')
  async ChangePassowrd(
    @Body() body: ChangePasswordDTO,
    @Req() request: Request,
  ) {
    const { userId } = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new ChangePassowrd(
        this.userRepository,
        this.cryptographyService,
      );
      await useCase.handle({
        confirmPassword: body.confirmPassword,
        lastPassword: body.lastPassword,
        password: body.password,
        userId: userId,
      });

      return 'PASSWORD_CHANGED_SUCCESSFULLY';
    } catch (err) {
      mapException(err);
    }
    if (!body.password) {
      throw new BadRequestException('REQUIRED_FIELD_PASSWORD');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('recover-password')
  async RecoverPassowrd(@Query('email') email: string) {
    try {
      const useCase = new RecoverPassowrd(
        this.userRepository,
        this.cryptographyService,
        this.emailService,
      );
      await useCase.handle({
        email: email,
      });
      return 'RECOVER_PASSWORD_SUCCESSFULLY';
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('reset-password')
  async ResetPassowrd(@Body() body: ResetPasswordDTO) {
    try {
      const useCase = new ResetPassowrd(
        this.userRepository,
        this.cryptographyService,
      );
      await useCase.handle({
        confirmPassword: body.confirmPassword,
        password: body.password,
        recoverToken: body.recoverToken,
      });
      return 'PASSWORD_CHANGED_SUCCESSFULLY';
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-all-users')
  async GetAll(@Req() request: Request) {
    const authHeader = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new AthorizedUseCase<void, User[]>(
        this.userRepository,
        this.groupRepository,
        new GetAllUsers(this.userRepository),
        ['get-all-users'],
      );
      return await useCase.handle({
        userId: authHeader.userId,
        data: undefined,
      });
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-user')
  async GetUser(@Query('id') id: number, @Req() request: Request) {
    const authHeader = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new AthorizedUseCase<GetUserParams, User>(
        this.userRepository,
        this.groupRepository,
        new GetUser(this.userRepository),
        ['get-user'],
      );
      return await useCase.handle({
        userId: authHeader.userId,
        data: { id },
      });
    } catch (err) {
      mapException(err);
    }
  }
  @HttpCode(HttpStatus.OK)
  @Get('get-profile')
  async GetProfile(@Req() request: Request) {
    const authHeader = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new AthorizedUseCase<GetUserParams, User>(
        this.userRepository,
        this.groupRepository,
        new GetUser(this.userRepository),
        [],
      );
      return await useCase.handle({
        userId: authHeader.userId,
        data: {
          id: authHeader.userId,
        },
      });
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('edit-user')
  async EditUser(@Body() body: EditUserDTO, @Req() request: Request) {
    const authHeader = await getAuthorizationHeader(
      this.hasherService,
      request,
    );
    try {
      const useCase = new AthorizedUseCase<EditUserParams, void>(
        this.userRepository,
        this.groupRepository,
        new EditUser(this.userRepository),
        ['edit-user'],
      );
      await useCase.handle({
        userId: authHeader.userId,
        data: {
          id: body.userId,
          groups: body.groups,
        },
      });
      return 'SUCCESS';
    } catch (err) {
      mapException(err);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete-all')
  async DeleteAll() {
    return await this.userRepository.deleteAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('email-test')
  async Test() {
    return this.emailService.sendEmail({
      to: 'josemicael16@hotmail.com',
      subject: 'Some Subject',
      text: 'Some Text',
    });
  }
}
