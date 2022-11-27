import styled from 'styled-components';

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

const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CommentCardChildrenWrapper = styled.div`
  padding-left: 40px;
`;

const CommentCardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentCardContent = styled.div``;

const CommentAreaTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  box-sizing: border-box;
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
  CommentAreaBottom,
  CommentAreaTextArea,
  CommentAreaTop,
  CommentCardChildrenWrapper,
  CommentCardContent,
  CommentCardInfo,
  CommentCardWrapper,
  CommentHeadLeft,
  CommentHeadRight,
};
