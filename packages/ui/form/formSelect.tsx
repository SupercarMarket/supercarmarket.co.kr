import * as React from 'react';
import { css } from 'styled-components';

import { Container, Input, Typography } from '../components';
import { Wrapper } from '../components/wrapper';
import { applyMediaQuery, theme } from '../styles';

type FormSelectOption = {
  name: string;
  values: string[];
  placeholder?: string;
  suffix?: string;
};

type FormSelectProps = React.PropsWithChildren &
  React.InputHTMLAttributes<HTMLInputElement> & {
    callback?: (value: string) => void;
    defaultValues?: string;
    option: FormSelectOption;
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
    <Container position="absolute" border="1px solid #EAEAEC" zIndex={999}>
      <Wrapper>
        {values.map((value) => (
          <li
            key={value}
            onClick={() => onSelect(value)}
            style={{
              width: '100%',
              listStyle: 'none',
              overflow: 'hidden',
              zIndex: 999,
            }}
          >
            <Wrapper.Item
              css={css`
                width: 100%;
                padding: 14px;
                z-index: 999;
                background: ${theme.color.white};
                cursor: pointer;
                font-size: ${theme.fontSize['body-14']};
                line-height: 150%;
                color: ${theme.color['greyScale-6']};
                &:hover {
                  background: ${theme.color['greyScale-2']};
                  color: ${theme.color.primary};
                  font-weight: bold;
                }
                ${applyMediaQuery('mobile')} {
                  padding: 12px;
                  font-size: ${theme.fontSize['body-12']};
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

const FormSelect = React.forwardRef(function FormSelect(
  props: FormSelectProps,
  ref: React.Ref<HTMLInputElement>
) {
  const { option, defaultValues, callback, ...rest } = props;
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
    if (defaultValues) setSelected(defaultValues);
  }, [defaultValues]);

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
          & > input {
            font-size: ${theme.fontSize['body-12']} !important;
          }
          ${applyMediaQuery('mobile')} {
            & > input {
              font-size: 8px !important;
            }
          }
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
            fill: ${theme.color['greyScale-6']};
            background-color: ${theme.color.white};
            ${applyMediaQuery('mobile')} {
              width: 16xpx;
              display: none;
            }
          `}
        >
          <svg
            onClick={onClick}
            viewBox="0 0 24 24"
            fill="current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_212_9286)">
              <path d="M4.19498 6.16504L2.42498 7.93504L12.325 17.835L22.225 7.93504L20.455 6.16504L12.325 14.295L4.19498 6.16504Z" />
            </g>
            <defs>
              <clipPath id="clip0_212_9286">
                <rect width="100%" height="100%" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Wrapper.Item>
        {open && <FormSelectItem values={option.values} onSelect={onSelect} />}
      </Wrapper>
      {option.suffix && <Typography>{option.suffix}</Typography>}
    </Container>
  );
});

export type { FormSelectOption, FormSelectProps };
export { FormSelect };
