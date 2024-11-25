import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from './dtos/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    //Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUsersParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log('isAuth', isAuth)
    return [
      { firstName: 'John', email: 'john@doe.com' },
      { firstName: 'Alice', email: 'alice@doe.com' },
    ];
  }

  public findUserById(id: string) {
    return { id: 123, firstName: 'John', email: 'john@doe.com' };
  }
}
