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
  @Input('canCancel') canCancel: boolean = false;
  @Input('keyPress') keyPress: boolean = false;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  submit(): void {
    if(!this.disabled && this.value.length) {
      this.disabled = true;
      this.onSubmit.emit({ value: this.value, callback: this.callback.bind(this) });
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }

  press(e): void {
    if(this.keyPress && e && !e.ctrlKey && !e.shiftKey && e.keyCode == 13) {
      this.submit();
    }
  }

  callback(): void {
    this.value = '';
    this.disabled = false;
  }
}
