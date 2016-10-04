import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContainerBlockPartialComponent, PollPartialComponent } from './../../partials/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ContainerBlockPartialComponent,
    PollPartialComponent,
  ],
  exports: [
    ContainerBlockPartialComponent,
    PollPartialComponent,
    FormsModule,
    CommonModule
  ]
})

export class SharedModule {}
