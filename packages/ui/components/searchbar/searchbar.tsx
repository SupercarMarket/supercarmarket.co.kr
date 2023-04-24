import clsx from 'clsx';
import * as React from 'react';
import { forwardRef } from 'react';
import { deviceQuery, theme } from '../../styles';

export interface SearchbarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'Line' | 'Grey';
  border?: 'rounded' | 'normal';
  handleClick?: (query: string) => void;
}
/**
 * 1. 리렌더링 최적화를 위한 온체인지 핸들러 설정 여부
 */
const Searchbar = forwardRef(function Searchbar(
  props: SearchbarProps,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    label = 'search',
    border = 'normal',
    variant = 'Grey',
    width = '100%',
    placeholder,
    className,
    defaultValue,
    handleClick: handleCallback,
    ...rest
  } = props;
  const input = React.useRef<HTMLInputElement>(null);
  const id = React.useId();
  const [query, setQuery] = React.useState((defaultValue as string) || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClose = (e: React.MouseEvent<HTMLInputElement>) => {
    setQuery('');
    if (input.current) input.current.focus();
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!query) return;
    if (!handleCallback) return;

    handleCallback(query);

    return;
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!value) return;
    if (!handleCallback) return;

    if (e.key === 'Enter') handleCallback(value);

    return;
  };

  return (
    <>
      <div className={clsx('search-container')}>
        <label htmlFor={id} hidden>
          {label}
        </label>
        <input
          ref={ref ?? input}
          role="search"
          id={id}
          placeholder={placeholder}
          className={clsx(
            'search',
            {
              [`search-${variant}`]: variant,
              [`search-${border}`]: border,
            },
            className
          )}
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onChange={handleChange}
          onKeyUp={handleEnter}
          value={query}
          {...rest}
        />
        <i
          className={clsx('search-icon', {
            [`search-${variant}`]: variant,
          })}
          onClick={handleClick}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_206_3022)">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#1E1E20"
              />
            </g>
            <defs>
              <clipPath id="clip0_206_3022">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </i>
        {query && variant === 'Grey' && (
          <i className={clsx('close-icon')} onClick={handleClose}>
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_275_10413)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#fff"
                />
              </g>
              <defs>
                <clipPath id="clip0_275_10413">
                  <rect width="100%" height="100%" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </i>
        )}
      </div>
      <style jsx>{`
        .search {
          all: unset;
          font-weight: 400;
          width: ${width};
          font-size: 16px;
          line-height: 150%;
          padding: 14px 0;
          box-sizing: border-box;
          border: 1px solid #f7f7f8;
        }
        .search::placeholder {
          color: #8e8e95;
        }
        .search:focus {
          border: 1px solid ${theme.color['greyScale-5']};
        }
        .search-rounded {
          border-radius: 20px;
        }
        .search-normal {
          border-radius: 4px;
        }
        .search-Grey {
          background-color: #f7f7f8;
          padding-left: 59px;
          padding-right: 59px;
        }
        .search-Line {
          box-sizing: border-box;
          background-color: #ffffff;
          border: 1px solid #c3c3c7;
          padding-left: 25px;
          padding-right: 59px;
        }
        .search-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .search-icon > svg {
          width: 24px;
          height: 24px;
        }
        .search-icon.search-Grey {
          background: none;
          padding: 0;
          left: 25px;
        }
        .search-icon.search-Line {
          background: none;
          border: none;
          padding: 0;
          right: 25px;
        }
        .close-icon {
          width: 18px;
          height: 18px;
          background: ${theme.color['greyScale-5']};
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          right: 25px;
          border-radius: 9px;
        }
        .search-container {
          position: relative;
          width: ${width};
        }
        @media (${deviceQuery.mobile}) {
          .search {
            padding: 12px 0;
            font-size: 14px;
            height: 45px;
          }
          .search-rounded {
            border-radius: 20px;
          }
          .search-normal {
            border-radius: 4px;
          }
          .search-Grey {
            background-color: #f7f7f8;
            padding-left: 34px;
            padding-right: 34px;
          }
          .search-Line {
            box-sizing: border-box;
            background-color: #ffffff;
            border: 1px solid #c3c3c7;
            padding-left: 13.5px;
            padding-right: 34px;
          }
          .search-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
          }
          .search-icon > svg {
            width: 18px;
            height: 18px;
          }
          .search-icon.search-Grey {
            background: none;
            padding: 0;
            left: 13.5px;
          }
          .search-icon.search-Line {
            background: none;
            border: none;
            padding: 0;
            right: 13.5px;
          }
          .close-icon {
            width: 18px;
            height: 18px;
            background: ${theme.color['greyScale-5']};
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            right: 13.5px;
            border-radius: 9px;
          }
        }
      `}</style>
    </>
  );
});

export { Searchbar };
