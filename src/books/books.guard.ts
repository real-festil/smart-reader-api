// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { PostsEntity } from './posts.entity';
// import * as isUUID from 'is-uuid';

// @Injectable()
// export class PostOwnerGuard implements CanActivate {
//   constructor(
//     @InjectRepository(PostsEntity)
//     private postsRepository: Repository<PostsEntity>,
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     const req = context.switchToHttp().getRequest();
//     if (req.params.postId && isUUID.v4(req.params.postId)) {
//       const post = await this.postsRepository.findOne(req.params.postId, {
//         relations: ['user'],
//       });
//       if (!post) {
//         throw new NotFoundException('Post not found');
//       }
//       if (post.user.id === req.user.id) {
//         return true;
//       } else {
//         throw new ForbiddenException('User does not have permission');
//       }
//     } else {
//       throw new ForbiddenException('Invalid post id type');
//     }
//   }
// }

// @Injectable()
// export class PostNotExistsGuard implements CanActivate {
//   constructor(
//     @InjectRepository(PostsEntity)
//     private postsRepository: Repository<PostsEntity>,
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     const req = context.switchToHttp().getRequest();
//     const user = await this.postsRepository.findOne({
//       id: req.params.postId,
//     });

//     if (!user) {
//       throw new ForbiddenException('Post with this id not exists');
//     }
//     return true;
//   }
// }
