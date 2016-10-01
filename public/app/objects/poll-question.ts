import { SafeStyle } from '@angular/platform-browser';

export class PollQuestion {
  id: number;
  question: string;
  answer_count?: number;
  percent?: number;
  widthStyle?: SafeStyle;
}
