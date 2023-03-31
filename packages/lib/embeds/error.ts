import { ErrorCode } from './httpError';

export const SupercarMarketApiError = class extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super();
    this.status = status;
    this.message = message || `${ErrorCode[status]}`;
    this.name = 'SupercarMarketApiError';
  }
};
