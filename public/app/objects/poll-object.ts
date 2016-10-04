import { Poll         } from './poll';
import { PollQuestion } from './poll-question';
import { PollAnswer   } from './poll-answer';

export class PollObject {
  poll: Poll;
  questions: PollQuestion[];
  answered: PollAnswer;
  totalAnswers: number;
  percent: number;
  widthStyle: string;
}
