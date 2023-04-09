import { useMutation } from '@tanstack/react-query';
import {
  registerAdvertisement,
  registerDealer,
  registerMisc,
  registerPartnership,
  registerSale,
} from './apis';

export const useRegisterDealer = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => registerDealer(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useRegisterSale = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => registerSale(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useRegisterPartnership = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => registerPartnership(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useRegisterAdvertisement = (options = {}) => {
  return useMutation({
    mutationFn: (data: FormData) => registerAdvertisement(data),
    useErrorBoundary: false,
    ...options,
  });
};

export const useRegisterMisc = (options = {}) => {
  return useMutation({
    mutationFn: (data: { title: string; contents: string }) =>
      registerMisc(data),
    useErrorBoundary: false,
    ...options,
  });
};
