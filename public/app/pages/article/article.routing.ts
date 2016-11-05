import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent     } from './article.component';
import { ArticleListComponent } from './article-list.component';
import { ArticleViewComponent } from './article-view.component';

const routes: Routes = [{
  path: 'articles',
  component: ArticleComponent,
  children: [{
    path: '',
    redirectTo: 'list/1'
  }, {
    path: 'list/:page',
    component: ArticleListComponent
  }, {
    path: 'view/:id',
    component: ArticleViewComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
