// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Post,
//   Patch,
//   Query,
// } from '@nestjs/common';
// import { Param, UseGuards } from '@nestjs/common';
// import { UserNotExistsGuard } from '../users/users.guard';
// import { PostsService } from './posts.service';
// import { PostOwnerGuard } from './posts.guard';
// import { AddPostDto, UpdatePostDto } from './posts.dto';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { CurrentUser } from 'src/decorators/current-user.decorator';

// @UseGuards(UserNotExistsGuard)
// @Controller('/posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   @ApiTags('Posts')
//   @ApiOperation({ summary: 'Add post' })
//   @Post()
//   async addPost(@CurrentUser('id') userId, @Body() addPostDto: AddPostDto) {
//     return await this.postsService.addPost(
//       userId,
//       addPostDto.bio,
//       addPostDto.image,
//     );
//   }

//   @ApiTags('Posts')
//   @ApiOperation({ summary: 'Delete post' })
//   @UseGuards(PostOwnerGuard, UserNotExistsGuard)
//   @Delete(':postId')
//   async deletePost(@Param('postId') postId: string) {
//     return await this.postsService.deletePost(postId);
//   }

//   @ApiTags('Posts')
//   @ApiOperation({ summary: 'Get all posts' })
//   @Get()
//   async getPosts(@Query('userId') userId: string) {
//     return await this.postsService.getPosts(userId);
//   }

//   @ApiTags('Posts')
//   @ApiOperation({ summary: 'Get single post' })
//   @UseGuards(PostOwnerGuard)
//   @Get(':postId')
//   async getSinglePost(
//     @Param('postId')
//     postId: string,
//   ) {
//     return await this.postsService.getSinglePost(postId);
//   }

//   @ApiTags('Posts')
//   @ApiOperation({ summary: 'Update post' })
//   @UseGuards(PostOwnerGuard)
//   @Patch(':postId')
//   async updatePost(
//     @Param('postId')
//     postId: string,
//     @Body() updatePostDto: UpdatePostDto,
//   ) {
//     return await this.postsService.updatePost(postId, updatePostDto.bio);
//   }
// }
