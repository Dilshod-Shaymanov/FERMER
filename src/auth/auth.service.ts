import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SignInAdminDto } from './dto/signin-admin.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from '../admin/entities/admin.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  // Yordamchi: Tokenlarni cookie'ga joylash
  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TIME_MS),
      secure: true,
      sameSite: 'strict',
    });
  }

  // Admin uchun tokenlarni yaratish
  async generateTokensWithAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_owner: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }

  // Yangi admin ro'yxatdan o'tkazish
  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const existingAdmin = await this.adminService.findAdminByEmail(
      createAdminDto.email,
    );

    if (existingAdmin) {
      throw new BadRequestException('Bunday admin mavjud!');
    }

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 10);
    const newAdmin = await this.adminService.create({
      ...createAdminDto,
      password: hashed_password,
    });

    const tokens = await this.generateTokensWithAdmin(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    await this.adminService.update(newAdmin.id, { hashed_refresh_token });

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
      admin: newAdmin,
      access_token: tokens.access_token,
    };
  }

  // Admin tizimga kirishi (Sign in)
  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(
      signInAdminDto.email,
    );

    if (!admin) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException("Login yoki parol noto'g'ri");
    }

    if (!admin.is_active) {
      throw new BadRequestException('Akkount hali faollashtirilmagan');
    }

    const tokens = await this.generateTokensWithAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    await this.adminService.update(admin.id, { hashed_refresh_token });

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      message: 'Tizimga muvaffaqiyatli kirildi',
      admin,
      access_token: tokens.access_token,
    };
  }

  // Tizimdan chiqish (Sign out)
  async signOut(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminService.findOne(payload.id);
    if (!admin) {
      throw new BadRequestException('Admin topilmadi');
    }

    await this.adminService.update(admin.id, { hashed_refresh_token: null });

    res.clearCookie('refresh_token');

    return {
      message: 'Tizimdan muvaffaqiyatli chiqildi',
    };
  }

  // Refresh token olish
  async refreshToken(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminService.findOne(payload.id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException(
        "Admin topilmadi yoki refresh token noto'g'ri",
      );
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!isRefreshTokenValid) {
      throw new BadRequestException("Refresh token noto'g'ri");
    }

    const tokens = await this.generateTokensWithAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 10);

    await this.adminService.update(admin.id, { hashed_refresh_token });

    this.setRefreshTokenCookie(res, tokens.refresh_token);

    return {
      access_token: tokens.access_token,
    };
  }
}
