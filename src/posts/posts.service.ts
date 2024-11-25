import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    // Injecting User Service
    private readonly userService: UsersService,
  ) {}

  public findAll(userId: string) {
    console.log('userId', userId);
    const user = this.userService.findUserById(userId);
    return [{ user, ttile: 'test title', content: 'test content' }];
  }

  public create(post: any) {
    return post;
  }
}
