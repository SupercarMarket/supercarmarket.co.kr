import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  QUERY_KEYS,
  createAccount,
  duplicateField,
  sendPhone,
  sendCode,
} from '.';
import { type Signup } from '@supercarmarket/types/auth';

export const useCreateAccount = (options = {}) => {
  return useMutation({
    mutationFn: (data: Signup) => createAccount(data),
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
