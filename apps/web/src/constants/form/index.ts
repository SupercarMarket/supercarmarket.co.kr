import { type FormSelectOption } from '@supercarmarket/ui/form/formSelect';
import { type RegisterOptions } from 'react-hook-form';

export type FormType =
  | 'text'
  | 'file'
  | 'email'
  | 'password'
  | 'tel'
  | 'files'
  | 'image'
  | 'images'
  | 'address'
  | 'textarea'
  | 'agreement'
  | 'radioGroup'
  | 'range'
  | 'select'
  | 'mixed';

export interface Form<K, T> {
  htmlFor: K;
  type: T;
  label?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  divider?: boolean;
  options: RegisterOptions & {
    option?: FormSelectOption;
  };
  button?: string;
  buttonWidth?: string;
  tooltip?: string;
  errorMessage?: string;
  successMessage?: string;
  callback?: (data: unknown) => void;
}
