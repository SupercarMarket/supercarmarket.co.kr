import styled from 'styled-components';

const CarInfoCard = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 30px 40px 20px 30px;
  border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Subject = styled.div`
  width: 90px;
`;
const Content = styled.div`
  width: 270px;
`;

export { CarInfoCard, Content, Info, Subject };
