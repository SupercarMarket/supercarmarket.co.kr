import styled, { css } from 'styled-components';

const CommentHeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const CommentHeadRight = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const cardWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const cardChildren = css`
  padding-left: 40px;
`;

const cardArea = css`
  padding-left: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const cardInfo = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const cardInfoWrapper = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentAreaTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.white};
  &::placeholder {
    background-color: ${({ theme }) => theme.color.white};
  }
`;

const CommentAreaTop = styled.div`
  width: 100%;
`;

const CommentAreaBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 14px;
`;

export {
  cardArea,
  cardChildren,
  cardInfo,
  cardInfoWrapper,
  cardWrapper,
  CommentAreaBottom,
  CommentAreaTextArea,
  CommentAreaTop,
  CommentHeadLeft,
  CommentHeadRight,
};
