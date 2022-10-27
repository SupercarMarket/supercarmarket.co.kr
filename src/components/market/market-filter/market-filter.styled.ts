import styled from 'styled-components';

export const MarketFilterContainer = styled.div`
  width: 1200px;
`;

export const MarketFilterForm = styled.form`
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

export const MarketFilterBox = styled.div`
  display: flex;
  gap: 24px;
`;

export const MarketFilterList = styled.ul`
  display: flex;
  gap: 9px;
`;

export const MArketFilterItem = styled.li`
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
