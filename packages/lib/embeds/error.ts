interface ErrorCode {
  [key: number]: string;
}

export const ErrorCode: ErrorCode = {
  402: '파일 업로드에 실패했습니다.',
  403: '파일 형식이 아닙니다.',
  410: '로그인이 필요합니다.',
  411: '아이디 중복',
  412: '이메일 중복',
  413: '닉네임 중복',
  414: '전화번호 중복',
  415: '비밀번호 확인 실패',
  416: '존재하지 않는 사용자 입니다.',
  420: '로그인 실패',
  421: '토큰 만료',
  422: '리프레쉬 토큰 만료',
  423: 'security filter error',
  424: '존재하지 않는 카테고리입니다.',
  430: '권한이 없습니다.',
  431: '존재하지 않는 게시물입니다.',
  450: '잘못된 요청입니다.',
  451: '이미 요청한 작업이 있습니다.',
  452: '게시글 등록 실패',
  460: '딜러가 아닙니다.',
  461: '승인이 나지 않았습니다.',
  470: '인증번호가 틀립니다.',
  500: '비밀번호가 다릅니다.',
  501: 'ACCESS TOKEN 갱신',
};

export const SupercarMarketApiError = class extends Error {
  status: number;
  constructor(status: number) {
    super();
    this.status = status;
    this.message = `${ErrorCode[status]}`;
    this.name = 'SupercarMarketApiError';
  }
};
