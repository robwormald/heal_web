import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule    } from 'ng2-popover';
import { TranslateModule  } from 'ng2-translate';
import { ModalModule      } from 'ng2-bootstrap/components/modal';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { PartialModule } from './../../partials/partial.module';
import { SharedServicesModule } from './../shared-services.module';

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
    SharedServicesModule,
    PartialModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    Ng2BreadcrumbModule,
    TranslateModule,
  ],
  providers: [
    BreadcrumbService,
  ]
})

export class SharedModule {}
