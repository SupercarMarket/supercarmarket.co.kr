export const truncate = (text: string, maxLength: number, ellipsis = true) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}${ellipsis ? '...' : ''}`;
};

export const truncateOnWord = (
  text: string,
  maxLength: number = 148,
  ellipsis = true
) => {
  if (text.length <= maxLength) return text;

  let truncatedText = text.substring(0, maxLength);

  if (ellipsis) truncatedText += '...';

  return truncatedText;
};
