import { useAuthState } from 'feature/authProvider';

const ResultId = () => {
  const { findId } = useAuthState();
  console.log(findId);
  return (
    <div>
      <h1>아이디 찾기 결과</h1>
    </div>
  );
};

export default ResultId;
