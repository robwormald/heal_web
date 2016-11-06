import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

var Popover = require('ng2-popover');
var Modal = require('ng2-bootstrap/ng2-modal');

import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import {
  ContainerBlockPartialComponent,
  PollPartialComponent,
  PaginationPartialComponent,
  RatePartialComponent,
  ModalPartialComponent,
  UserPartialComponent,
  BBCodePartialComponent,
  CommentsPartialComponent,
  TextareaPartialComponent,
  DatePartialComponent,
  MonitorPartialComponent,
} from './../../partials/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Popover.PopoverModule,
    Modal.ModalModule,
    Ng2BreadcrumbModule,
  ],
  declarations: [
    ContainerBlockPartialComponent,
    PollPartialComponent,
    PaginationPartialComponent,
    RatePartialComponent,
    ModalPartialComponent,
    UserPartialComponent,
    BBCodePartialComponent,
    CommentsPartialComponent,
    TextareaPartialComponent,
    DatePartialComponent,
    MonitorPartialComponent,
  ],
  exports: [
    ContainerBlockPartialComponent,
    PollPartialComponent,
    PaginationPartialComponent,
    RatePartialComponent,
    ModalPartialComponent,
    UserPartialComponent,
    BBCodePartialComponent,
    CommentsPartialComponent,
    TextareaPartialComponent,
    DatePartialComponent,
    MonitorPartialComponent,
    FormsModule,
    CommonModule,
    Ng2BreadcrumbModule,
  ],
  providers: [
    BreadcrumbService,
  ]
})

export class SharedModule {}
