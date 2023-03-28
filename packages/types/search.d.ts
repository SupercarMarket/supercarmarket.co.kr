import type { CommunityDto } from './community';
import type { MagazineDto } from './magazine';
import type { MarketDto } from './market';
import { PartnershipDto } from './partnership';

interface SearchAll {
  magazine: MagazineDto[];
  paparazzi: CommunityDto[];
  product: MarketDto[];
  partnership: PartnershipDto[];
}

export type { SearchAll };
