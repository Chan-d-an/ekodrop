export interface User {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: 'user' | 'admin' | 'moderator'|'guest';
}

