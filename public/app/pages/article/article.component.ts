import { Component } from '@angular/core';
import { Store     } from '@ngrx/store';

import { TranslateService  } from 'ng2-translate';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { AppState, Article } from './../../store/constants';

@Component({
  moduleId: module.id,
  templateUrl: './article.component.html',
})

export class ArticleComponent {
  currentArticle: Article;

  constructor(
    private breadcrumb: BreadcrumbService,
    private store: Store<AppState>,
    private translate: TranslateService,
  ) {
    this.breadcrumb.hideRoute('/articles/view');
    this.breadcrumb.hideRoute('/articles/list');
    this.breadcrumb.hideRouteRegex('^/articles/list/[0-9]');
    this.translate.get('pages.article.title').subscribe((res: string) => {
      this.breadcrumb.addFriendlyNameForRoute('/articles', res);
    });
    this.breadcrumb.addCallbackForRouteRegex('^/articles/view/[0-9]$', this.setArticleTitle.bind(this));
    this.store.select('currentArticle').subscribe((currentArticle: Article) => this.currentArticle = currentArticle);
  }

  private setArticleTitle(): string {
    return this.currentArticle && this.currentArticle.title || ' ';
  }
}
