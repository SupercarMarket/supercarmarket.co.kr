import dayjs from 'dayjs';
import MobileDetect from 'mobile-detect';

type ErrorWithMessage = {
  message: string;
};

const isValidQuery = (query: string | null, ...values: string[]) => {
  if (!query) return false;
  if (!values) return false;
  if (values.includes(query)) return true;
  return false;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

const getErrorMessage = (error: unknown) => toErrorWithMessage(error).message;

const env = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing: process.env['${key}'].`);
  }

  return value;
};

const catchNoExist = (...lists: unknown[]) => {
  lists.forEach((list) => {
    if (list === undefined) throw new Error('No Exist Query or Data');
  });
};

const isExpire = (exp: number) => {
  if (Date.now() < exp) return true;
  return false;
};

const isToday = (date: string) => {
  return (
    dayjs(new Date()).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
  );
};

const isMobile = (userAgent?: string) => {
  if (!userAgent) return false;

  const mb = new MobileDetect(userAgent);

  return mb.mobile() ? true : false;
};

export {
  catchNoExist,
  env,
  getErrorMessage,
  isValidQuery,
  isExpire,
  isToday,
  isMobile,
};
