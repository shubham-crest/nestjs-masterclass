import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from './dtos/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

/**
 * Class to connect to Users table and perform business operations.
 */
@Injectable()
export class UsersService {
  constructor(
    /** Injecting userRepository Service */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check is user exists with same email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle exception

    // Create a new user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

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
