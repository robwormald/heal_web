import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'form-partial',
  templateUrl: './form.component.html',
})

export class FormPartialComponent {
  datepickerToday: Date = new Date();
  datepickerHidden: boolean = false;

  @Input('fields') fields = [];
  @Input('model') model = {};
  @Input('specificId') specificId;

  @Input('buttonText') buttonText = 'Submit';

  @Output() onSubmit = new EventEmitter<any>();

  submit(): void {
    this.onSubmit.emit(this.model);
  }

  dateSelected(): void {
    this.datepickerHidden = true;
    setTimeout(() => this.datepickerHidden = false);
  }
}
