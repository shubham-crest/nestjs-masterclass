import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from './dtos/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';

/**
 * Class to connect to Users table and perform business operations.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor for the UsersService class.
   * @param authService The AuthService instance injected via dependency injection.
   */
  constructor(
    /** Injecting Auth Service */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * The method to get all the users from the database.
   * @param getUsersParamsDto Parameters for filtering users.
   * @param limit The maximum number of users to retrieve.
   * @param page The page number for pagination.
   * @returns An array of user objects.
   */
  public findAll(
    getUsersParamsDto: GetUsersParamsDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    return [
      { firstName: 'John', email: 'john@doe.com' },
      { firstName: 'Alice', email: 'alice@doe.com' },
    ];
  }

  /**
   * Find a single user using the ID of the user.
   * @param id The unique identifier of the user.
   * @returns A user object with details like ID, name, and email.
   */
  public findUserById(id: string) {
    return { id: 123, firstName: 'John', email: 'john@doe.com' };
  }
}
