import clsx from 'clsx';
import { InputHTMLAttributes, Ref, useId } from 'react';
import { forwardRef } from 'react';

import SearchIcon from '../../../assets/svg/search.svg';

export interface SearchbarProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'Line' | 'Grey';
  border?: 'rounded' | 'normal';
}
/**
 * 1. 리렌더링 최적화를 위한 온체인지 핸들러 설정 여부
 */
const Searchbar = (props: SearchbarProps, ref: Ref<HTMLInputElement>) => {
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
          <SearchIcon />
        </i>
      </div>
      <style jsx>{`
        .search {
          all: unset;
          font-weight: 400;
          font-size: 16px;
          line-height: 150%;
          padding: 14px 0;
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
};

export default forwardRef(Searchbar);
