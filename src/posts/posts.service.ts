// import { Inject, Injectable, Scope } from '@nestjs/common';
// import { PostsEntity } from './posts.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UserService } from 'src/users/users.service';
// import { REQUEST } from '@nestjs/core';
// import { Request } from 'express';
// const FileReader = require('filereader'),
//   fileReader = new FileReader();

// @Injectable({ scope: Scope.REQUEST })
// export class PostsService {
//   constructor(
//     @InjectRepository(PostsEntity)
//     private postsRepository: Repository<PostsEntity>,
//     private userService: UserService,
//     @Inject(REQUEST) private readonly request: Request,
//   ) {}

//   async addPost(userId: string, bio: string, image: string) {
//     const user = await this.userService.getSingleUser(userId);
//     const blob = Buffer.from(image, 'base64');
//     return await this.postsRepository.save({ bio, image: blob, user });
//   }

//   async getPosts(userId: string) {
//     console.log(userId);
//     const res = await this.postsRepository.find({
//       where: { user: { id: userId } },
//     });

//     return res.map((post) => ({
//       ...post,
//       image: post.image.toString('base64'),
//     }));
//   }

//   async getSinglePost(postId: string) {
//     return await this.postsRepository.findOne(postId);
//   }

//   async updatePost(postId: string, name: string) {
//     return await this.postsRepository.save({ id: postId, name });
//   }

//   async deletePost(postId: string) {
//     return await this.postsRepository.delete({ id: postId });
//   }
// }
