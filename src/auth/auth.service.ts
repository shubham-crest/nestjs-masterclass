import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    // Check user exists in db
    const user = this.usersService.findOneById(1234);

    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
