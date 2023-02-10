'use client';

import styled from 'styled-components';

const MarketFilterContainer = styled.div`
  width: 1200px;
  height: 350px;
`;

const MarketFilterArea = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 20px;
  padding: 28px 24px;
  background: ${({ theme }) => theme.color['greyScale-2']};
  border-radius: 4px;
`;

const MarketFilterBox = styled.div`
  display: flex;
  gap: 24px;
`;

const MarketFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterListArea = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const MarketFilterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

const MarketFilterItem = styled.li`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  height: 44px;
  padding: 10px 22px;
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
  border-radius: 20px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color['greyScale-5']};
  cursor: pointer;
`;

export {
  FilterListArea,
  MarketFilterArea,
  MarketFilterBox,
  MarketFilterContainer,
  MarketFilterItem,
  MarketFilterList,
  MarketFilterWrapper,
  ResetButton,
};
