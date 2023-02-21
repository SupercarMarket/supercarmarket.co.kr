import { Container, Highlight, Typography } from '@supercarmarket/ui';

interface SearchNotifyProps {
  keyword: string;
  totalCount: number;
}

const SearchNotify = (props: SearchNotifyProps) => {
  const { keyword, totalCount } = props;
  return (
    <Container
      width="100%"
      height="80px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        as="b"
        fontSize="header-20"
        fontWeight="bold"
        lineHeight="120%"
        color="greyScale-6"
      >
        <Highlight>{keyword}</Highlight>에 대한{' '}
        <Highlight>{totalCount}</Highlight>개의 결과
      </Typography>
    </Container>
  );
};

export default SearchNotify;
