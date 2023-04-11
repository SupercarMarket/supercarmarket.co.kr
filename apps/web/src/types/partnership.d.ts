declare module Partnership {
  interface PartnershipDto {
    brdSeq: string;
    partnerName: string;
    description: string;
    category: string;
    workTime: string;
    wireNumber: string;
    address: string;
    siteUrl: string;
    imgSrc: string;
  }

  type PartnershipDetailDto<T> = Omit<PartnershipDto, 'imgSrc'> & {
    representative: string;
    address: string;
    treatedItem: string;
    introduction: string;
    imgSrc: T[];
    companyName: string;
  };
}
