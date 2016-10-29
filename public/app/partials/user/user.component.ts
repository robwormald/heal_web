import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'user-partial',
  templateUrl: './user.component.html',
})

export class UserPartialComponent {
  @Input('user') user;
}
