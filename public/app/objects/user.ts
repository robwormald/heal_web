export class User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  permissions: string[];

  constructor(user) {
    Object.assign(this, user);
  }

  isAdmin(): boolean {
    return this.permissions.includes('administrator');
  }

  isMod(): boolean {
    return this.permissions.includes('moderator');
  }

  canModerate(id: number): boolean {
    return id == this.id || this.isAdmin() || this.isMod();
  }
}
