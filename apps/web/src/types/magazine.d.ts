declare module Magazine {
  interface Status {
    isScraped: boolean;
    isCounseling: boolean;
  }

  interface MagazineDto {
    id: string;
    title: string;
    contents: string;
    imgSrc: string;
    comments: number;
    created: string;
  }

  type MagazinePostDto = Common.Posting & {
    imgSrc: string;
  };
}
