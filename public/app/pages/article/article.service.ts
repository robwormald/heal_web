import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppStore } from './../../app.store';

@Injectable()
export class ArticleService {
  constructor(
    private store: AppStore,
    private http: Http
  ) {}

  getArticles(page: number): void {
    this.http.get(`api/article/list/${page}`)
      .map(res => res.json())
      .subscribe(res => {
        let articleList = {
          articles: res.articles,
          totalCount: res.count,
          currentPage: res.page,
          perPage: res.per,
        };

        this.store.setKeyValue('articleList', articleList);
      });
  }

  getArticle(id: number): void {
    this.http.get(`api/article/view/${id}`)
      .map(res => res.json())
      .subscribe(res => this.store.setKeyValue('currentArticle', res.article));
  }
}
