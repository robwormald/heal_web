import { Article } from './article';

export class ArticleList {
  articles: Article[];
  totalCount: number;
  currentPage: number;
  perPage: number;
}
