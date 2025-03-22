export type UserType = 'artist' | 'collector' | 'fan' | 'content-creator' | 'investor';

export interface UserProfile {
  id: string;
  name: string;
  usertype: UserType;
  bio?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
}