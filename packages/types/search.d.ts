import type { CommunityDto } from './community';
import type { MagazineDto } from './magazine';
import type { MarketDto } from './market';

interface SearchAll {
  magazine: MagazineDto[];
  paparazzi: CommunityDto[];
  product: MarketDto[];
  partnership: [];
}

export type { SearchAll };
