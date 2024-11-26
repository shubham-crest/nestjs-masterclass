import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    // Injecting User Service
    private readonly userService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    // Find auhtor from database based on authorId
    let author = await this.userService.findOneById(createPostDto.authorId);

    // Create post
    let post = this.postRepository.create({ ...createPostDto, author });

    // return Created post to user
    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    return await this.postRepository.find();
  }

  public async delete(id: number) {
    // deleting the post
    await this.postRepository.delete(id);

    // confirmation
    return { deleted: true, id };
  }
}
