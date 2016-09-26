import { User } from './user';

export class ChatMessage {
  id: number;
  body: string;
  user_id: number;
  chat_room_id: number;
  created_at: Date;
  user: User;
}
