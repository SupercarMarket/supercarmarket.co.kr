import Container from '../container';
import Pagination from '../pagination';
import CommentArea from './commentArea';
import CommentBody from './commentBody';
<<<<<<< HEAD
<<<<<<< HEAD
import CommentHead from './commentHead';
=======
>>>>>>> 7be72e2 (feat: Comment Component 마크업)
=======
import CommentHead from './commentHead';
>>>>>>> 643580a (feat: Comment Head Component)

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
<<<<<<< HEAD
<<<<<<< HEAD
      <CommentHead totalCount={9999} />
=======
>>>>>>> 7be72e2 (feat: Comment Component 마크업)
=======
      <CommentHead totalCount={9999} />
>>>>>>> 643580a (feat: Comment Head Component)
      <CommentBody />
      <Pagination page={0} totalPages={1} totalCount={2} pageSize={10} />
      <CommentArea />
    </Container>
  );
};

export default Comment;
