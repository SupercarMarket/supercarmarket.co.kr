declare module ADs {
  interface Common {
    imageUrl: string;
    url: string;
  }

  interface AdDto extends ADs.Common {
    adPosition: 'M' | 'L' | 'R';
    imageName: string;
  }

  type BannerDto = ADs.Common;
}
