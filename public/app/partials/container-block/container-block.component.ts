import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'container-block',
  templateUrl: 'container-block.component.html'
})

export class ContainerBlockPartialComponent {
  @Input('header') header = '';
  @Input('center') center = false;
}
