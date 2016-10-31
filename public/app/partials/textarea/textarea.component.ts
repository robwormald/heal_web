import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'textarea-partial',
  templateUrl: './textarea.component.html',
})

export class TextareaPartialComponent {
  disabled: boolean = false;

  @Input('uniqId') uniqId;
  @Input('placeholder') placeholder;
  @Input('value') value = '';
  @Input('rows') rows: number = 2;
  @Input('bbcode') bbcode: boolean = true;
  @Output() onSubmit = new EventEmitter();

  submit(): void {
    if(!this.disabled && this.value && this.value.length) {
      this.disabled = true;
      this.onSubmit.emit({ value: this.value, callback: this.callback.bind(this) });
    }
  }

  callback(): void {
    this.value = '';
    this.disabled = false;
  }
}
