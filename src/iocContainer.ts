import {
    attemptsCollection,
    bloggersCollection,
    commentsCollection,
    enqueueMessageCollection,
    postsCollection,
    usersCollection
} from "./repositories/db";
import {Container} from "inversify";
import {BloggersRepository} from "./repositories/bloggers-repository";
import {BloggersService, IBloggersRepository} from "./domain/bloggers-service";
import {PostsRepository} from "./repositories/posts-repository";
import {TYPES} from "./TYPES";
import {PostsService} from "./domain/posts-service";
import {UsersRepository} from "./repositories/users-repo";
import {UsersService} from "./domain/users-service";
import {CommentsRepository} from "./repositories/comments-repo";
import {CommentsService} from "./domain/comment-service";
import {EmailService} from "./domain/email-service";
import {AuthService} from "./domain/auth-service";
import {AttemptsRepository} from "./repositories/attempts-repository";
import {AttemptsControlMiddleware} from "./middlewares/attempts-control";


export const myContainer = new Container();

export const bloggersRepository = new BloggersRepository(bloggersCollection, postsCollection);
export const bloggersService = new BloggersService(bloggersRepository)
export const postsRepository = new PostsRepository(postsCollection, bloggersCollection, bloggersRepository);
export const postsService = new PostsService(postsRepository)
export const usersRepository = new UsersRepository(usersCollection)
export const usersService = new UsersService(usersRepository)
export const commentsRepository = new CommentsRepository(commentsCollection)
export const commentsService = new CommentsService(commentsRepository)
export const emailService = new EmailService()
export const authService = new AuthService(emailService)
export const attemptsRepository = new AttemptsRepository(attemptsCollection)
export const attemptsControl = new AttemptsControlMiddleware(attemptsRepository)

myContainer.bind<IBloggersRepository>(TYPES.IBloggersRepository).to(BloggersRepository);
myContainer.bind<BloggersService>(TYPES.BloggersService).to(BloggersService)
myContainer.bind<BloggersRepository>(TYPES.BloggersRepository).toConstantValue(bloggersRepository)
myContainer.bind<AttemptsRepository>(TYPES.AttemptsRepository).toConstantValue(attemptsRepository)