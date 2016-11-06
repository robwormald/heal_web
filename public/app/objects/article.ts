import { User } from './user';

export class Article {
  id: number;
  title: string;
  body: string;
  description: string;
  image: string;
  user: User;
  created_at: Date;
  parsed?: string;
}
