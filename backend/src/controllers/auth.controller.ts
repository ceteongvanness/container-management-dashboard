// backend/src/controllers/auth.controller.ts
import { Controller, Post, Get, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService, JwtAuthGuard } from '../auth';
import { LoginCredentials, AuthResponse } from '../types/types';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}