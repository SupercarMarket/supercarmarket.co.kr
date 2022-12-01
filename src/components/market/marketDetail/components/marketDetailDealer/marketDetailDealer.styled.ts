'use client';

import styled from 'styled-components';

const DealerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 140px;
  margin-top: 20px;
  padding: 30px 40px;
  border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 4px;
  box-sizing: border-box;
`;

const DealerProfile = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 50%;
  object-fit: contain
  border: 1px;
`;

const DealerDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Div = styled.div``;

const P = styled.p``;

const DealerContact = styled.div`
  display: flex;
  align-items: center;
`;

export { DealerCard, DealerContact, DealerDetail, DealerProfile, Div, P };
