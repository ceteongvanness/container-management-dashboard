// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, AuthResponse } from '../types/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.findUser(username);
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      // Create a new object without the password
      const { id, username: name, roles } = user;
      return { id, username: name, roles };
    }
    return null;
  }

  async login(user: Omit<User, 'password'>): Promise<AuthResponse> {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
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
