import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'file-partial',
  templateUrl: './file.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilePartialComponent),
    multi: true
  }]
})

export class FilePartialComponent implements ControlValueAccessor {
  file: any;
  propagateChange = (_: any) => {};

  @Input('type') type = '';
  @Input('uniqId') uniqId;
  @ViewChild('hiddenInput') hiddenInput;

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  writeValue(value: any) {
    if(value !== undefined) this.file = value;
  }

  onDragOver(): boolean {
    return false;
  }

  onDragEnd(): boolean {
    return false;
  }

  onDrop(event: Event): boolean {
    let file = event['dataTransfer'].files[0];
    this.workWithFile(file);
    return false;
  }

  onClick(): void {
    this.hiddenInput.nativeElement.click();
  }

  onChange(event: Event): void {
    let file = event.target['files'][0];
    this.workWithFile(file);
  }

  onLoad(file: File): void {
    this.file = file;
    this.propagateChange(file);
  }

  private workWithFile(file: File): void {
    if(!file) return;
    this.file = {};

    let reader = new FileReader();
    reader.onload = this.onLoad.bind(this, file);
    reader.readAsDataURL(file);
  }

  private acceptTypeString(): string {
    return `${this.type}/*`;
  }
}
