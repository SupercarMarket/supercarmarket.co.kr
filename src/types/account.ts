import { User } from './base';

type Rating = '1' | '2' | '3' | '4' | '5';

interface Profile extends User {
  rating: Rating;
  posted: number;
  commented: number;
  visited: number;
  description?: number;
  backgroundImgSrc?: string;
  representativeImgSrc?: string[];
}

interface UpdateInfo {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  description: string;
  gallery: string[];
  background: string;
}

export type { Profile, Rating, UpdateInfo };
