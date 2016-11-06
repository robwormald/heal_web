import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { AppStore } from './../../app.store';

@Component({
  moduleId: module.id,
  templateUrl: './article.component.html',
})

export class ArticleComponent {
  constructor(
    private breadcrumb: BreadcrumbService,
    private store: AppStore,
  ) {
    this.breadcrumb.hideRoute('/articles/view');
    this.breadcrumb.hideRoute('/articles/list');
    this.breadcrumb.hideRouteRegex('^/articles/list/[0-9]');
    this.breadcrumb.addFriendlyNameForRoute('/articles', 'Articles');
    this.breadcrumb.addCallbackForRouteRegex('^/articles/view/[0-9]$', this.setArticleTitle.bind(this));
  }

  private setArticleTitle(): string {
    let article = this.store.getKeyValue('currentArticle');
    return article.title;
  }
}
