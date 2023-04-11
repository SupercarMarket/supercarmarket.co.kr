declare module Live {
  interface Common {
    tags: string[];
    title: string;
  }
  interface LiveDto extends Live.Common {
    id: string;
    thumbnailUrl: string;
    name: string;
  }

  interface LiveRoomDto extends Live.Common {
    broadCastSeq: number;
    isMine: boolean;
    sessionId: string;
    userCount: number;
    userName: string;
    userSeq: number;
  }
}
