interface ErrorCode {
  [key: number]: string;
}

export const ErrorCode: ErrorCode = {
  402: '파일 업로드에 실패했습니다.',
  403: '파일 형식이 아닙니다.',
  410: '로그인이 필요합니다.',
  411: '중복되었습니다',
  412: '아이디가 존재하지 않습니다.',
  413: '비밀번호가 틀립니다.',
  414: '비밀번호 확인 실패',
  415: '존재하지 않는 사용자 입니다.',
  416: '잘못된 토큰 입니다.',
  417: '탈퇴한 회원입니다.',
  420: '로그인 실패',
  421: '엑세스 토큰 만료',
  422: '리프레쉬 토큰 만료',
  423: 'security filter error',
  424: '존재하지 않는 카테고리입니다.',
  425: 'ACCESS TOKEN 갱신',
  430: '권한이 없습니다.',
  431: '존재하지 않는 게시물 입니다.',
  432: '갤러리 사진은 최대 3장 입니다.',
  450: '잘못된 요청입니다.',
  451: '이미 요청한 작업이 있습니다.',
  452: '게시글 등록 실패',
  460: '딜러가 아닙니다.',
  461: '승인이 나지 않았습니다.',
  470: '문자 메세지 전송 실패',
  471: '인증번호가 틀립니다.',
  500: '서버 에러',
  502: '차단된 유저',
  510: '딜러 중복',
};

export class HttpError<TCode extends number = number> extends Error {
  public readonly cause?: Error;
  public readonly statusCode: TCode;
  public readonly message: string;
  public readonly url: string | undefined;
  public readonly method: string | undefined;

  constructor(opts: {
    url?: string;
    method?: string;
    message?: string;
    statusCode: TCode;
    cause?: Error;
  }) {
    super(opts.message ?? `HTTP Error ${opts.statusCode} `);

    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = HttpError.prototype.constructor.name;

    this.cause = opts.cause;
    this.statusCode = opts.statusCode;
    this.url = opts.url;
    this.method = opts.method;
    this.message = opts.message ?? `HTTP Error ${opts.statusCode}`;

    if (opts.cause instanceof Error && opts.cause.stack) {
      this.stack = opts.cause.stack;
    }
  }

  public static fromRequest(request: Request, response: Response) {
    return new HttpError({
      message: response.statusText || ErrorCode[response.status],
      url: response.url,
      method: request.method,
      statusCode: response.status,
    });
  }
}
