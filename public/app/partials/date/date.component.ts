import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'date-partial',
  template: `<span class='date-partial'>{{ date }}</span>`,
})

// | date:"y MMM d j:mm"
export class DatePartialComponent {
  @Input('date') date;
}
