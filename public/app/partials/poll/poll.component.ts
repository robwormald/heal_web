import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'poll-partial',
  templateUrl: './poll.component.html'
})

export class PollPartialComponent {
  selectedQuestion: number;
  @Input('poll') poll;
  @Input('questions') questions;
  @Input('answered') answered;
  @Input('totalAnswers') totalAnswers;
  @Input('view') view = false;
  @Output() onVote = new EventEmitter<number>();

  vote(): void {
    this.onVote.emit(this.selectedQuestion);
  }
}
