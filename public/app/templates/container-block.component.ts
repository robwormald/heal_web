import { Component, Input } from '@angular/core';

@Component({
  selector: 'container-block',
  templateUrl: 'app/templates/container-block.component.html'
})

export class ContainerBlockComponent {
  @Input('title') containerTitle = '';
  @Input('center') containerCenter = false;
}
