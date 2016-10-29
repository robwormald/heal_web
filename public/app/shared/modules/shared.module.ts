import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

var Modal = require('ng2-bootstrap/ng2-modal');

import {
  ContainerBlockPartialComponent,
  PollPartialComponent,
  PaginationPartialComponent,
  RatePartialComponent,
  ModalPartialComponent,
  UserPartialComponent,
} from './../../partials/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Modal.ModalModule,
  ],
  declarations: [
    ContainerBlockPartialComponent,
    PollPartialComponent,
    PaginationPartialComponent,
    RatePartialComponent,
    ModalPartialComponent,
    UserPartialComponent,
  ],
  exports: [
    ContainerBlockPartialComponent,
    PollPartialComponent,
    PaginationPartialComponent,
    RatePartialComponent,
    ModalPartialComponent,
    UserPartialComponent,
    FormsModule,
    CommonModule,
  ]
})

export class SharedModule {}
