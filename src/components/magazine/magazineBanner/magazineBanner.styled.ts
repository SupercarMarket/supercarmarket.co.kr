import styled, { css } from 'styled-components';

const contentsEllipsis = (line: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
`;

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 394px;
  gap: 10px;
  &.mb-reverse {
    flex-direction: row-reverse;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 590px;
  height: 394px;
  gap: 16px;
`;

const ContentsWrapper = styled.div`
  width: 590px;
  height: 394px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  fill: #fff;
  .mb-contents-heading {
    width: 480px;
    ${contentsEllipsis(2)}
  }
  .mb-contents-body {
    width: 480px;
    ${contentsEllipsis(3)}
  }
  .mb-contents-body.mb-button {
    ${contentsEllipsis(2)}
  }
  .mb-button {
  }
`;

const ButtonWrapper = styled.div`
  width: 480px;
  display: flex;
`;

export { ButtonWrapper, Container, ContentsWrapper, ImageWrapper };
