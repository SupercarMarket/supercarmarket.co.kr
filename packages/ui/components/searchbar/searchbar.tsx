import clsx from 'clsx';
import { InputHTMLAttributes, Ref, useId } from 'react';
import { forwardRef } from 'react';

export interface SearchbarProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'Line' | 'Grey';
  border?: 'rounded' | 'normal';
}
/**
 * 1. 리렌더링 최적화를 위한 온체인지 핸들러 설정 여부
 */
const Searchbar = forwardRef(function Searchbar(
  props: SearchbarProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    label = 'search',
    border = 'normal',
    variant = 'Grey',
    placeholder,
    className,
    width,
    ...rest
  } = props;
  const id = useId();

  return (
    <>
      <div className={clsx('search-container')}>
        <label htmlFor={id} hidden>
          {label}
        </label>
        <input
          ref={ref}
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
          style={{
            width,
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        />
        <i
          className={clsx('search-icon', {
            [`search-${variant}`]: variant,
          })}
        >
          <svg
            width="24"
            height="24"
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
      </div>
      <style jsx>{`
        .search {
          all: unset;
          font-weight: 400;
          font-size: 16px;
          line-height: 150%;
          padding: 14px 0;
          box-sizing: border-box;
        }
        .search::placeholder {
          color: #8e8e95;
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
          padding-right: 25px;
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
          top: 14px;
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
        .search-container {
          position: relative;
          width: fit-content;
        }
      `}</style>
    </>
  );
});

export { Searchbar };
