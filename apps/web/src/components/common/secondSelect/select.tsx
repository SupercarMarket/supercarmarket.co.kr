import React, { createContext, useContext } from 'react';
import { Typography } from '@supercarmarket/ui';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import * as S from './select.styled';

interface IState {
  toggle: boolean;
  onToggle(b: boolean): void;
  current?: string;
  changeCurrent(c?: string): void;
}

const SelectContext = createContext<IState | null>(null);

const useSelectContext = (component: string) => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(`SelectContext can't find ${component}`);
  }
  return context;
};

const SelectProvider = ({ children }: React.PropsWithChildren) => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [current, setCurrent] = React.useState<string>();

  const onToggle = (b: boolean) => setToggle(b);
  const changeCurrent = (c?: string) => setCurrent(c);

  const value = {
    toggle,
    onToggle,
    current,
    changeCurrent,
  };

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

interface SecondSelectProps {
  width: string;
  children: React.ReactNode;
}

const SecondSelect = ({ width, children }: SecondSelectProps) => {
  return (
    <SelectProvider>
      <S.SelectContainer width={width}>{children}</S.SelectContainer>
    </SelectProvider>
  );
};

interface SelectButtonProps {
  align: 'left' | 'center' | 'right';
  children: React.ReactNode;
  selected: string;
}

const SelectButton = ({ align, selected, children }: SelectButtonProps) => {
  const { toggle, onToggle, current, changeCurrent } =
    useSelectContext('SelectButton');

  React.useEffect(() => {
    changeCurrent(selected);
  }, [changeCurrent, selected]);

  const closeToggle = () => onToggle(false);
  const clickToggle = () => onToggle(!toggle);

  return (
    <>
      <S.Backdrop toggle={toggle} onClick={closeToggle} />
      <S.SelectCurrentButton type="button" onClick={clickToggle} align={align}>
        <Typography fontSize="body-16">{current || children}</Typography>
        <ArrowBottom width="13px" height="13px" />
      </S.SelectCurrentButton>
    </>
  );
};

interface SelectListProps {
  width?: string;
  children: React.ReactNode;
}

const SelectList = ({ width, children }: SelectListProps) => {
  const { toggle } = useSelectContext('SelectList');
  return (
    <S.SelectOptionList width={width} toggle={toggle}>
      {children}
    </S.SelectOptionList>
  );
};

interface SelectItemProps {
  children: string;
  onClick?: (u: React.MouseEvent) => void;
}

const SelectItem = ({ children, onClick }: SelectItemProps) => {
  const { onToggle, current, changeCurrent } = useSelectContext('SelectItem');

  const clickOption = (e: React.MouseEvent) => {
    changeCurrent(children);
    if (onClick) {
      onClick(e);
    }
    onToggle(false);
  };

  return (
    <S.SelectOptionItem onClick={clickOption}>
      <S.SelectOptionButton type="button" active={current === children}>
        <Typography fontSize="body-16">{children}</Typography>
      </S.SelectOptionButton>
    </S.SelectOptionItem>
  );
};

SecondSelect.Button = SelectButton;
SecondSelect.List = SelectList;
SecondSelect.Item = SelectItem;

export default SecondSelect;
