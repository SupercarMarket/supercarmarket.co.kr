import { atom } from 'recoil';
import { layoutPropsValue } from './defaultValue';

export const layoutPropsRecoil = atom({
  key: 'layoutPropsRecoil',
  default: layoutPropsValue,
});
