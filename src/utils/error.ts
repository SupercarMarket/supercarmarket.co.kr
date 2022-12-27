const ServerApiError = class extends Error {
  status: number;
  constructor({ message, status }: { message: string; status: number }) {
    super();
    this.status = status;
    this.message = `[ERROR] ${message}`;
    this.name = 'ServerApiError';
  }
};

export { ServerApiError };
