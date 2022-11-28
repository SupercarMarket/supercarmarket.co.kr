import styled from 'styled-components';

const PostingHeadTop = styled.div``;

const PostingHeadBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostingHeadBottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const PostingHeadBottomRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PostingHeadBottomRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export {
  PostingHeadBottom,
  PostingHeadBottomLeft,
  PostingHeadBottomRight,
  PostingHeadBottomRightWrapper,
  PostingHeadTop,
};
