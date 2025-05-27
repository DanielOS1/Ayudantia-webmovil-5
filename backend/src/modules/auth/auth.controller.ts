import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseGuards, 
  Request,
  HttpStatus,
  HttpException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto'; 
import { JwtAuthGuard } from './jwt-auth.guard'; // El guard que creamos arriba
import { ApiResponse } from 'src/interface/ApiResponse';
import { AccessTokenResponse } from 'src/utils/auth';
import { CreateResponse } from 'src/utils/api-response.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<AccessTokenResponse>> {
    return await this.authService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<AccessTokenResponse>> {
    return await this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<ApiResponse<any>> {
    try {
      const userProfile = await this.authService.getProfile(req.user.rut);
      return CreateResponse(
        'Perfil obtenido exitosamente',
        userProfile,
        'OK'
      );
    } catch (error) {
      throw error;
    }
  }
}