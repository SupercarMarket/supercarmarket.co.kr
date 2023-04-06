export const homeCategoryFormatter = (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  if (category === 'best') return 'interestProduct';
  if (category === 'new') return 'latestProduct';
  return category;
};

export const marketFormatter = (category: string) => {
  if (category === '스포츠카') return 'sports-car';
  if (category === '세단') return 'saloon';
  if (category === 'SUV') return 'suv';
  if (category === '픽업트럭') return 'pickup-truck';
  if (category === '클래식카&올드카') return 'classic-car';
  return 'all';
};

export const partnershipFormatter = (category: string) => {
  if (category === '전체') return 'ALL';
  if (category === '자동차매장') return 'DEALER_SHOP';
  if (category === '공업사') return 'CAR_CENTER';
  if (category === '도색') return 'PAINTING';
  if (category === '디테일링') return 'DEATILING';
  return 'ETC';
};

export const inquiryStatusFormatter = (status: number) => {
  if (status === 0) return '대기중';
  if (status === 1) return '처리 완료';
  if (status === 2) return '답변 완료';
  return '반려';
};

export const searchTypeFormatter = (
  searchType: string,
  options?: {
    reverse?: boolean;
  }
) => {
  if (options?.reverse) {
    if (searchType === 'user') return '닉네임';
    if (searchType === 'title-contents') return '제목 + 본문';
    return '제목';
  }

  if (searchType === '닉네임') return 'user';
  if (searchType === '제목 + 본문') return 'title-contents';
  return 'title';
};
