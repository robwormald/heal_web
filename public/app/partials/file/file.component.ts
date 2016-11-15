import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'file-partial',
  templateUrl: './file.component.html'
})

export class FilePartialComponent {
  errors: any = {};
  megabyte: number = 1024 * 1024;
  validValidations: any = {
    size: this.validateSize.bind(this),
    type: this.validateType.bind(this),
  };

  @Input('validations') validations;
  @Input('selectedFile') selectedFile;
  @Output('selectedFileChange') selectedFileChange = new EventEmitter<File>();
  @ViewChild('hiddenInput') hiddenInput;

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
    this.selectedFile = file;
    this.selectedFileChange.emit(file);
  }

  private workWithFile(file: File): void {
    this.selectedFile = {};

    if(this.validateFile(file)) {
      let reader = new FileReader();
      reader.onload = this.onLoad.bind(this, file);
      reader.readAsDataURL(file);
    }
    else {
      console.error(this.errors);
    }
  }

  private validateFile(file: File): boolean {
    for(var validation in this.validations) {
      let func = this.validValidations[validation];
      if(func) func(file, this.validations[validation]);
    }

    return !(!!Object.keys(this.errors).length);
  }

  private validateSize(file: File, validation: any): void {
    if(file.size < validation * this.megabyte) return;
    this.errors[validation] = `Maximum allowed file size is ${validation * this.megabyte}MB`;
  }

  private validateType(file: File, validation: any): void {
    if(file.type.includes(validation)) return;
    this.errors[validation] = `Invalid file type, allowed: ${validation}`;
  }

  private acceptTypeString(): string {
    return `${this.validations.type}/*`;
  }
}
