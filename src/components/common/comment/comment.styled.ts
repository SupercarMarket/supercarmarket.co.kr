import styled from 'styled-components';

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

export {
  CommentCardChildrenWrapper,
  CommentCardContent,
  CommentCardInfo,
  CommentCardWrapper,
};
