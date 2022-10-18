import styled from 'styled-components';

const Container = styled.nav`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Divider = styled.div`
  width: 255px;
  height: 3px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  background-color: ${({ theme }) => theme.color['greyScale-6']};
  &[data-active='false'] {
    display: none;
  }
`;

export { Container, Divider };
