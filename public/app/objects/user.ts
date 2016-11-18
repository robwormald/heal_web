class Avatar {
  url: string;
  thumb: { url: string };
  small: { url: string };
}

export class User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  permissions: string[];
  avatar: Avatar;
  residence?: string;
  birthday?: Date;
  signature?: string;

  constructor(user) {
    Object.assign(this, user);
    this.created_at = new Date(this.created_at);
    this.updated_at = new Date(this.updated_at);
    this.birthday = new Date(this.birthday);
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

  avatarUrl(type: any): string {
    let url = (type ? this.avatar[type] : this.avatar).url;
    return `${url}?${this.updated_at}`;
  }
}
