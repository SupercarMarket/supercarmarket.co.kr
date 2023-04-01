import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  createAccount,
  duplicateField,
  sendPhone,
  sendCode,
  resetPassword,
  findId,
  updateAccount,
  deleteAccount,
} from '.';
import { type Signup } from '@supercarmarket/types/auth';
import { type FormState } from 'constants/form/updateInfo';

export const useCreateAccount = (options = {}) => {
  return useMutation({
    mutationFn: (data: Signup) => createAccount(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useUpdateAccount = (options = {}) => {
  return useMutation({
    mutationFn: (
      data: FormState & {
        code: string;
      }
    ) => updateAccount(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useDeleteAccount = (options = {}) => {
  return useMutation({
    mutationFn: (data: { accessToken: string; refreshToken: string }) =>
      deleteAccount(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useResetPassword = (options = {}) => {
  return useMutation({
    mutationFn: (data: {
      phone: string;
      authentication: string;
      id: string;
      password: string;
    }) => resetPassword(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useFindId = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      phone: string;
      authentication: string;
      name: string;
    }) => findId(data),
    onSuccess: (result) => {
      queryClient.setQueryData(QUERY_KEYS.findId(), result);
    },
    useErrorBoundary: false,
    ...options,
  });
};

export const useDuplicateField = (field: string, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: string) => duplicateField(value, field),
    onSuccess: (result) => {
      queryClient.setQueryData(QUERY_KEYS.duplicate(field), result);
    },
    useErrorBoundary: false,
    ...options,
  });
};

export const useSendPhone = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phone: string) => sendPhone(phone),
    onSuccess: (result) => {
      queryClient.setQueryData(QUERY_KEYS.phone(), result);
    },
    useErrorBoundary: false,
    ...options,
  });
};

export const useSendCode = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      sendCode(phone, code),
    onSuccess: (result) => {
      queryClient.setQueryData(QUERY_KEYS.code(), result);
    },
    useErrorBoundary: false,
    ...options,
  });
};
