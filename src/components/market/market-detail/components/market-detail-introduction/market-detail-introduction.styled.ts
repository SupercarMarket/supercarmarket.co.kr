import styled from 'styled-components';

const Introduction = styled.div`
  margin-top: 20px;
  height: 800px;
  padding: 30px 40px;
  border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  word-wrap: break-word;
`;

export { Content, Introduction };
