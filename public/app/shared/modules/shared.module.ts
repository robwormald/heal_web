import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule    } from 'ng2-popover';
import { TranslateModule  } from 'ng2-translate';
import { ModalModule      } from 'ng2-bootstrap/components/modal';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { PollRenderService } from './../../shared/services/poll-render.service';

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
  FormPartialComponent,
  FilePartialComponent,
  TabsPartialComponent,
} from './../../partials/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PopoverModule,
    ModalModule,
    DatepickerModule,
    Ng2BreadcrumbModule,
    TranslateModule,
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
    FormPartialComponent,
    FilePartialComponent,
    TabsPartialComponent,
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
    FormPartialComponent,
    FilePartialComponent,
    TabsPartialComponent,
    FormsModule,
    CommonModule,
    Ng2BreadcrumbModule,
    TranslateModule,
  ],
  providers: [
    BreadcrumbService,
    PollRenderService,
  ]
})

export class SharedModule {}
