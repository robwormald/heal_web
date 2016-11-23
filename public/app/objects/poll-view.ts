import { Poll         } from './poll';
import { PollQuestion } from './poll-question';
import { PollAnswer   } from './poll-answer';

export class PollView {
  poll: Poll;
  questions: PollQuestion[];
  answered: PollAnswer;
  totalAnswers: number;
  percent: number;
  widthStyle: string;
  message?: string;
}
