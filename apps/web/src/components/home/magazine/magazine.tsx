import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { type MagazineDto } from '@supercarmarket/types/magazine';
import { MagazineBanner } from 'components/magazine';
import MagazineCard from 'components/magazine/magazineCard';
import { css } from 'styled-components';
import RouterButton from '../routerButton';
import { useHome } from 'http/server/home';
import {
  CardSkeleton,
  MagazineBannerSkeleton,
} from 'components/fallback/loading';

interface MagazineProps {
  isMobile?: boolean;
}

const Magazine = ({ isMobile }: MagazineProps) => {
  const pageSize = isMobile ? 4 : 8;

  const {
    data: magazine,
    isLoading,
    isFetching,
  } = useHome<MagazineDto[]>('magazine', {
    pageSize: String(pageSize),
  });

  if (isLoading || isFetching)
    return (
      <Container display="flex" flexDirection="column" gap="20px">
        <MagazineBannerSkeleton />
        <CardSkeleton variant="column" size={pageSize} />
      </Container>
    );

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {magazine && magazine.data.length > 0 && (
        <>
          <MagazineBanner reverse button initialData={magazine.data[0]} />
          <Wrapper
            css={css`
              margin: 40px 0;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr 1fr;
              gap: 20px;

              ${applyMediaQuery('mobile')} {
                column-gap: 8px;
                row-gap: 16px;
                grid-template-columns: 1fr 1fr;
              }
            `}
          >
            {magazine.data.slice(1, 5).map((list) => (
              <MagazineCard key={list.id} type="small" {...list} />
            ))}
          </Wrapper>
        </>
      )}
      <RouterButton href="/magazine">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          슈마 매거진
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Magazine;
