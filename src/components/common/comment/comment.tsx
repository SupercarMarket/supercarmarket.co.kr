import Container from '../container';
import Pagination from '../pagination';
import CommentArea from './commentArea';
import CommentBody from './commentBody';
import CommentHead from './commentHead';

export interface Comment {
  nickname?: string;
  profileSrc?: string;
  content?: string;
  like?: number;
  createAt?: Date;
  updateAt?: Date;
  children?: Comment[];
}

interface CommentProps {
  comments?: Comment[];
  totalPages?: number;
  totalCount?: number;
  isLast?: boolean;
}

const Comment = ({}: CommentProps) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="20px"
      padding="40px 40px"
      border="1px solid #EAEAEC"
      borderRadius="4px"
    >
      <CommentHead totalCount={9999} />
      <CommentBody />
      <Pagination page={0} totalPages={1} totalCount={2} pageSize={10} />
      <CommentArea />
    </Container>
  );
};

export default Comment;
