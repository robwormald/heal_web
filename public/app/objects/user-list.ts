import { User } from './user';

export class UserList {
  users: User[];
  totalCount: number;
  currentPage: number;
  perPage: number;
}
