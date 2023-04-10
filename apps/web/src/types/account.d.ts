declare module Account {
  type Rating = '1' | '2' | '3' | '4' | '5' | '6';
  type Role = 'user' | 'dealer';

  interface Common {
    background?: string;
    gallery?: string[];
    description?: number;
  }

  interface ProfileDto extends Account.Common {
    nickname: string;
    userRating: Rating;
    role: Role;
    boardCount: number;
    commentCount: number;
    visitCount: number;
    representativeImgSrc?: string[];
    createdDate: string;
  }

  interface UpdateInfoDto extends Account.Common {
    id: string;
    name: string;
    nickname: string;
    phone: string;
    email: string;
  }
}
