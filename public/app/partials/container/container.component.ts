import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'container-block',
  templateUrl: 'container.component.html'
})

export class ContainerPartialComponent {
  @Input('header') header = '';
  @Input('center') center = false;
}
