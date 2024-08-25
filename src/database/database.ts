import 'reflect-metadata';
import { DataSource, In, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { User } from './entities/user';
import { Question } from "./entities/question";
import { Subject } from "./entities/subject";

let questionRepo: Repository<Question>;
let subjectRepo: Repository<Subject>;
let userRepo: Repository<User>;

export async function initializeDatabase() {
  const dataSource = new DataSource({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: 'public',
    type: 'postgres',
    database: 'postgres',
    port: 5432,
    driver: require('pg'),
    entities: [User],
    synchronize: false, // Set to true when you want to sync DB fields and tables with codebase
  });
  await dataSource
    .initialize()
    .then(() => console.info('Database connected successfully'))
    .catch((err: Error) => console.error('Error during database initialization', err));

  questionRepo = dataSource.getRepository(Question);
  subjectRepo = dataSource.getRepository(Subject);
  userRepo = dataSource.getRepository(User);
}

export { subjectRepo, questionRepo, userRepo };
