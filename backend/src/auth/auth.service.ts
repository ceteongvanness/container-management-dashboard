// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../types/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<Omit<User, 'password'> | null> {
    // In production, fetch from database
    const user = await this.findUser(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async findUser(username: string): Promise<User | undefined> {
    // Mock user lookup - replace with database query in production
    const users: Record<string, User> = {
      admin: {
        id: '1',
        username: 'admin',
        password: await bcrypt.hash('admin', 10),
        roles: ['admin'],
      },
    };
    return users[username];
  }
}