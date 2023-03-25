export const homeCategoryFormatter = (
  category: 'market' | 'magazine' | 'best' | 'new' | 'community' | 'partnership'
) => {
  if (category === 'best') return 'interestProduct';
  if (category === 'new') return 'latestProduct';
  return category;
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
