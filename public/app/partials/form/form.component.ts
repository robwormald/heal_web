import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

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
  @ViewChild('form') form;

  submit(): void {
    this.onSubmit.emit({ data: this.getFormData(), form: this.form });
  }

  dateSelected(): void {
    this.datepickerHidden = true;
    setTimeout(() => this.datepickerHidden = false);
  }

  private getFormData(): any {
    let object = {};
    this.fields.map((field) => object[field.name] = this.model[field.name]);
    return object;
  }
}
