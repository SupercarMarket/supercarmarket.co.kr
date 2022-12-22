const ServerApiError = class extends Error {
  constructor({ message }: { message: string }) {
    super();
    this.message = `[ERROR] ${message}`;
    this.name = 'ServerApiError';
  }
};

export { ServerApiError };
