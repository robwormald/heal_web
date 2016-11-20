import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './../../validators/custom-validators';

@Component({
  moduleId:  module.id,
  selector: 'form-partial',
  templateUrl: 'form.component.html'
})

export class FormPartialComponent implements OnInit, OnChanges {
  datepickerToday: Date = new Date();
  datepickerHidden: boolean = false;

  formErrors: any = {};
  reactiveForm: FormGroup;
  submitted: boolean = false;
  copyModel: any = {};
  validationMessages = {
    required: ' is required.',
    fileSize: ' size is too big.',
    fileType: ' has invalid format.',
  };

  @Input('fields') fields = [];
  @Input('model') model = {};
  @Input('specificId') specificId;
  @Input('buttonText') buttonText = 'forms.global.submit';

  @Output() onSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.reBuildForm(this.model);
  }

  ngOnChanges(): void {
    this.submitted = false;
    this.reBuildForm(this.model);
  }

  submit(): void {
    this.submitted = true;

    if(this.reactiveForm.valid) {
      this.onSubmit.emit({ form: this.reactiveForm });
    }
    else {
      this.reBuildForm(this.reactiveForm.value);
    }
  }

  dateSelected(): void {
    this.datepickerHidden = true;
    setTimeout(() => this.datepickerHidden = false);
  }

  private reBuildForm(object: any): void {
    this.copyObject(object);
    this.buildForm();
  }

  private copyObject(object: any): void {
    Object.assign(this.copyModel, object);
  }

  private buildForm(): void {
    let formData = {};
    this.fields.map((field) => formData[field.name] = [this.copyModel[field.name], this.getValidations(field)]);
    this.reactiveForm = this.formBuilder.group(formData);
    this.reactiveForm.valueChanges.subscribe(() => this.onValueChanged());
    this.onValueChanged();
  }

  private getValidations(field: any): any {
    if(!field.validations) return;

    let validations = [];
    for(const key in field.validations) {
      const value = field.validations[key];
      const validator = Validators[key] || CustomValidators[key];

      if(value) validations.push(validator(value));
      else validations.push(validator);
    }
    return validations;
  }

  private onValueChanged() {
    if(!this.reactiveForm) return;

    const form = this.reactiveForm;
    this.fields.map((field) => {
      this.formErrors[field.name] = [];

      const control = form.get(field.name);
      if(!(control && (control.dirty || this.submitted) && !control.valid)) return;

      for(const key in control.errors) {
        this.formErrors[field.name].push(`${this.humanize(field.name)} ${this.validationMessages[key]}`);
      }
    });
  }

  private humanize(string: string): string {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace(/_/g, ' ');
  }
}
