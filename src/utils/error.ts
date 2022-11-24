const ServerApiError = class extends Error {
  constructor(endPoint: string) {
    super();
    this.message = `[ERROR] Server ${endPoint} Api Error`;
    this.name = 'ServerApiError';
  }
};

export { ServerApiError };
