const id = (value: string) => {
  if (!value) return '아이디를 입력해주세요.';
  if (!/^[a-zA-Z][0-9a-zA-Z]{3,10}$/.test(value))
    return '영문/숫자/ 3자 이상 10자 미만으로 입력해주세요.';
  return true;
};

const password = (value: string) => {
  if (!value) return '비밀번호를 입력해주세요.';
  if (!/^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value))
    return '영문/숫자/특수문자 중 2가지 이상, 8자 이상으로 입력해주세요.';
  return true;
};

const passwordConfirm = (value: string) => {
  if (!value) return '비밀번호를 입력해주세요.';
  if (
    !/^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/.test(
      value
    )
  )
    return '영문/숫자/특수문자를 포함하여 8자 이상으로 입력해주세요.';
  return true;
};

const name = (value: string) => {
  if (!value) return '이름을 입력해주세요.';
  if (!/^[가-힣]{2,6}$/.test(value))
    return '한글 2자 이상 6자 미만으로 입력해주세요.';
};

const nickname = (value: string) => {
  if (!value) return '닉네임을 입력해주세요.';
  if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{2,10}$/.test(value))
    return '한글/영문/대소문자 2자 이상 10자 미만으로 입력해주세요';
  return true;
};

const phone = (value: string) => {
  if (!value) return '번호를 입력해주세요.';
  if (!/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/.test(value))
    return '핸드폰 형식에 맞춰 입력해주세요.';
  return true;
};

const authentication = (value: string) => {
  if (!value) return '인증번호를 입력해주세요.';
  return true;
};

const email = (value: string) => {
  if (!value) return '이메일을 입력해주세요.';
  if (
    !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      value
    )
  )
    return '이메일 형식에 맞춰 입력해주세요.';
  return true;
};

const service = (value: string) => {
  if (!value) return '서비스 이용약관에 동의해주세요.';
  return true;
};

const privacy = (value: string) => {
  if (!value) return '개인정보 수집 이용에 동의해주세요.';
  return true;
};

export {
  authentication,
  email,
  id,
  name,
  nickname,
  password,
  passwordConfirm,
  phone,
  service,
  privacy,
};
