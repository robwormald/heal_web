export class Comment {
  id: number;
  body: string;
  created_at: Date;
  parsed?: string;
  editing?: boolean;
  rateData?: Object;
}
