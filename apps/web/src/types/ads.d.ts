declare module ADs {
  interface Common {
    imageUrl: string;
    url: string;
  }

  interface AD extends ADs.Common {
    adPosition: 'M' | 'L' | 'R';
    imageName: string;
  }

  type Banner = ADs.Common;
}
