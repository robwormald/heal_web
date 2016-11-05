import { NgModule } from '@angular/core';

import { routing              } from './article.routing';
import { SharedModule         } from './../../shared/modules/shared.module';
import { ArticleComponent     } from './article.component';
import { ArticleListComponent } from './article-list.component';
import { ArticleViewComponent } from './article-view.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    ArticleViewComponent,
  ],
  exports: [ArticleComponent],
})

export class ArticleModule {}
