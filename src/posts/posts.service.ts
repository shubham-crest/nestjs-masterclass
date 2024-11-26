import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class PostsService {
  constructor(
    // Injecting User Service
    private readonly userService: UsersService,

    // Injecting Tags Service
    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    // Find auhtor from database based on authorId
    let author = await this.userService.findOneById(createPostDto.authorId);

    // Find Tags
    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // Create post
    let post = this.postRepository.create({ ...createPostDto, author, tags });

    // return Created post to user
    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    return await this.postRepository.find({
      relations: {
        // tags: true,
      },
    });
  }

  public async delete(id: number) {
    // deleting the post
    await this.postRepository.delete(id);

    // confirmation
    return { deleted: true, id };
  }
}
