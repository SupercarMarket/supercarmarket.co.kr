declare module Community {
  interface Common {
    id: string;
    title: string;
    like: number;
    view: number;
    comments: number;
    created: string;
    date: string;
  }

  interface CommunityDto extends Community.Common {
    nickname: string;
    date: string;
    profileSrc?: string;
    category: string;
    imgSrc: string;
    popular: boolean;
    rate: Account.Rating;
  }

  interface CommunityPostDto extends Community.Common {
    contents: string;
    updated: string;
    isLiked: boolean;
    isMyPost: boolean;
    user: Common.User;
    files?: { url: string; name: string }[];
  }

  interface CommunityTemporaryStorageDto {
    category: string;
    tempId: string;
    title: string;
    contents: string;
    images: stirng[];
    files: { url: string; name: string }[];
  }
}
