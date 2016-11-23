import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopoverModule    } from 'ng2-popover';
import { TranslateModule  } from 'ng2-translate';
import { ModalModule      } from 'ng2-bootstrap/components/modal';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { ALL_SERVICES } from './../services/index';
import { ALL_PARTIALS } from './../../partials/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // PopoverModule,
    ModalModule,
    DatepickerModule,
    // Ng2BreadcrumbModule,
    TranslateModule,
  ],
  declarations: [
    ALL_PARTIALS,
  ],
  exports: [
    FormsModule,
    CommonModule,
    // Ng2BreadcrumbModule,
    TranslateModule,
    ALL_PARTIALS,
  ],
  providers: [
    BreadcrumbService,
    ALL_SERVICES,
  ]
})

export class SharedModule {}
