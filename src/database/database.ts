import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';
import { Answer, Chapter, Comment, FriendRelation, Post, Progress, Question, Quiz, Stopwatch, Subject, User, UserQuizAttempt, Video} from './entities'

let answerRepo: Repository<Answer>;
let chapterRepo: Repository<Chapter>;
let commentRepo: Repository<Comment>;
let friendRelationsRepo: Repository<FriendRelation>;
let postRepo: Repository<Post>;
let progressRepo: Repository<Progress>;
let questionRepo: Repository<Question>;
let quizRepo: Repository<Quiz>;
let stopwatchRepo: Repository<Stopwatch>;
let subjectRepo: Repository<Subject>;
let userRepo: Repository<User>;
let userQuizAttemptsRepo: Repository<UserQuizAttempt>;
let videoRepo: Repository<Video>;

export async function initializeDatabase() {
  const dataSource = new DataSource({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: 'public',
    type: 'postgres',
    database: 'postgres',
    port: 6543,
    driver: require('pg'),
    entities: [Answer, Chapter, Comment, FriendRelation, Post, Progress, Question, Quiz, Stopwatch, Subject, User, UserQuizAttempt, Video],
    synchronize: false, // Set to true when you want to sync DB fields and tables with codebase
  });
  await dataSource
    .initialize()
    .then(() => console.info('Database connected successfully'))
    .catch((err: Error) => console.error('Error during database initialization', err));

  questionRepo = dataSource.getRepository(Question);
  subjectRepo = dataSource.getRepository(Subject);
  userRepo = dataSource.getRepository(User);
  answerRepo = dataSource.getRepository(Answer);
  chapterRepo = dataSource.getRepository(Chapter);
  commentRepo = dataSource.getRepository(Comment);
  friendRelationsRepo = dataSource.getRepository(FriendRelation);
  postRepo = dataSource.getRepository(Post);
  progressRepo = dataSource.getRepository(Progress);
  quizRepo = dataSource.getRepository(Quiz);
  stopwatchRepo = dataSource.getRepository(Stopwatch);
  userQuizAttemptsRepo = dataSource.getRepository(UserQuizAttempt);
  videoRepo = dataSource.getRepository(Video);
}

export {
  questionRepo,
  subjectRepo,
  userRepo,
  answerRepo,
  chapterRepo,
  commentRepo,
  friendRelationsRepo,
  postRepo,
  progressRepo,
  quizRepo,
  stopwatchRepo,
  userQuizAttemptsRepo,
  videoRepo
};
