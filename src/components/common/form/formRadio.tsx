import { css } from 'styled-components';

import Wrapper from '../wrapper';

interface FormRadioProps {
  name?: string;
  options: {
    value: string;
    name: string;
  }[];
}

const FormRadio = (props: FormRadioProps) => {
  const { name, options } = props;

  return (
    <fieldset id={name}>
      {options.map((option) => (
        <Wrapper
          key={option.value}
          css={css`
            display: flex;
            align-items: center;
            gap: 11px;
            input[type='radio'] {
              -webkit-appearance: none;
              appearance: none;
              display: none;
            }
            input[type='radio'] + label {
              display: inline-block;
              width: 16px;
              height: 16px;
              border: 1px solid ${({ theme }) => theme.color.primary};
              border-radius: 50%;
              position: relative;
              cursor: pointer;
            }
            input[type='radio'] + label > div {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-sizing: border-box;
              border: 2px solid ${({ theme }) => theme.color.white};
            }
            input[type='radio']:checked + label > div {
              background: ${({ theme }) => theme.color.primary};
            }
            span {
              font-weight: 500;
              font-size: 16px;
              line-height: 150%;
            }
          `}
        >
          <input
            type="radio"
            id={option.value}
            value={option.value}
            name={name}
          />
          <label htmlFor={option.value}>
            <div />
          </label>
          <span>{option.name}</span>
        </Wrapper>
      ))}
    </fieldset>
  );
};

export default FormRadio;
