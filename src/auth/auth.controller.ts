import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    // Injecting Auth Server
    private readonly authService: AuthService,
  ) {}
}
