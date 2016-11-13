import { Component, Input, ViewChild } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'modal-partial',
  templateUrl: './modal.component.html',
})

export class ModalPartialComponent {
  @Input('title') title;
  @Input('size') size = 'md';
  @ViewChild('modalWindow') modalWindow;

  show(): void {
    this.modalWindow.show();
  }
}
