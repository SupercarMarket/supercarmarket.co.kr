declare module ADs {
  interface Common {
    imageUrl: string;
    url: string;
    imageName: string;
    adPosition: 'L' | 'M' | 'R';
  }

  interface AdDto extends ADs.Common {
    middle: ADs.Common;
    left: ADs.Common;
    right: ADs.Common;
  }

  type BannerDto = ADs.Common;
}
