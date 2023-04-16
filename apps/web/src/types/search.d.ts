declare module Search {
  interface SearchDto {
    magazine: Magazine.MagazineDto[];
    paparazzi: Community.CommunityDto[];
    product: Market.MarketDto[];
    partnership: Partnership.PartnershipDto[];
  }
}
