export interface User {
  uid: string;
  name: string;
  avatar?: string;
  bio?: string;
  tier: 'Free' | 'Plus' | 'Pro' | 'Legend';
  allowAnonChat: boolean;
  createdAt: Date;
}

export interface Post {
  id: string;
  uid: string;
  caption: string;
  imageURL?: string;
  isAnon: boolean;
  lat: number;
  lng: number;
  createdAt: Date;
  expiresAt: Date;
  views: string[];
  likes: string[];
  comments: number;
  ekoStats: {
    reach: number;
    viewers: number;
    maxRadius: number;
  };
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  isAnon: boolean;
  uid?: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  isAnon: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  messages: Message[];
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  uid: string;
  createdAt: Date;
}

export interface Subscription {
  uid: string;
  tier: 'Free' | 'Plus' | 'Pro' | 'Legend';
  startDate: Date;
  endDate: Date;
}