import * as React from 'react';
import { css } from 'styled-components';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import Container from '../container';
import Input from '../input';
import Typography from '../typography';
import Wrapper from '../wrapper';

type FormSelectProps = React.PropsWithChildren &
  React.InputHTMLAttributes<HTMLInputElement> & {
    callback?: (value: string) => void;
    option: {
      name: string;
      values: string[];
      placeholder?: string;
      suffix?: string;
    };
  };

interface FormSelectItem {
  values: string[];
  onSelect: (value: string) => void;
}

const FormSelectItem = React.memo(function FormSelectItem({
  values,
  onSelect,
}: FormSelectItem) {
  return (
    <Container position="absolute" border="1px solid #EAEAEC">
      <Wrapper>
        {values.map((value) => (
          <li
            key={value}
            onClick={() => onSelect(value)}
            style={{
              width: '100%',
              listStyle: 'none',
              overflow: 'hidden',
            }}
          >
            <Wrapper.Item
              css={css`
                width: 100%;
                padding: 14px;
                z-index: 999;
                background: ${({ theme }) => theme.color.white};
                cursor: pointer;
                font-size: 14px;
                line-height: 150%;
                color: ${({ theme }) => theme.color['greyScale-6']};
                &:hover {
                  background: ${({ theme }) => theme.color['greyScale-2']};
                  color: ${({ theme }) => theme.color.primary};
                  font-weight: bold;
                }
              `}
            >
              {value}
            </Wrapper.Item>
          </li>
        ))}
      </Wrapper>
    </Container>
  );
});

const FormSelect = (
  props: FormSelectProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const { option, callback, ...rest } = props;
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const onSelect = React.useCallback((value: string) => {
    setSelected(value);
    onClick();
  }, []);

  const handleClickOutSide = (e: MouseEvent) => {
    if (
      open &&
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    )
      setOpen(false);
  };

  React.useEffect(() => {
    if (callback) callback(selected);
  }, [selected]);

  React.useEffect(() => {
    if (open) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });
  return (
    <Container
      ref={containerRef}
      role="option"
      aria-selected="false"
      display="flex"
      alignItems="center"
      gap="8px"
    >
      <Wrapper
        css={css`
          width: 100%;
          position: relative;
        `}
      >
        <Input
          ref={ref}
          placeholder="선택하세요"
          onClick={onClick}
          readOnly
          value={selected}
          style={{
            width: '100%',
            cursor: 'pointer',
          }}
          {...rest}
        />
        <Wrapper.Item
          css={css`
            position: absolute;
            cursor: pointer;
            top: 50%;
            right: 13px;
            transform: translateY(-50%);
            width: 18px;
            fill: ${({ theme }) => theme.color['greyScale-6']};
          `}
        >
          <ArrowBottom />
        </Wrapper.Item>
        {open && <FormSelectItem values={option.values} onSelect={onSelect} />}
      </Wrapper>
      {option.suffix && <Typography>{option.suffix}</Typography>}
    </Container>
  );
};

export type { FormSelectProps };
export default React.forwardRef(FormSelect);
