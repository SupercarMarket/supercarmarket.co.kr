import type { MarketDto } from '@supercarmarket/types/market';
import { Container, Wrapper } from '@supercarmarket/ui';

interface SearchMarketProps {
  data: MarketDto[];
}

const SearchMarket = ({ data }: SearchMarketProps) => {
  return (
    <Container>
      <Wrapper />
    </Container>
  );
};

export default SearchMarket;
