type Rating = '1' | '2' | '3' | '4' | '5' | '6';

interface Profile {
  nickname: string;
  userRating: Rating;
  boardCount: number;
  commentCount: number;
  visitCount: number;
  description: number | null;
  background: string | null;
  representativeImgSrc?: string[];
  gallery: string[];
  createdDate: string;
  role: 'user' | 'dealer';
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
