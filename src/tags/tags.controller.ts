import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  /**
   * Post Route for creating new Tags
   * @param createTagDto
   */
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
