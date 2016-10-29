import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'modal-partial',
  templateUrl: './modal.component.html',
})

export class ModalPartialComponent {
  @Input('title') title;
  @Input('size') size = 'md';
  @Input('controller') controller;
  @Output() onExit = new EventEmitter<number>();
}
