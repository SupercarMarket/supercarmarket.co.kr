import * as React from 'react';
import { css } from 'styled-components';
import { FormCheckbox } from '../../form';
import { applyMediaQuery, theme } from '../../styles';

import { Container } from '../container';
import { Typography } from '../typography';
import { Wrapper } from '../wrapper';

interface TableProps {
  tab:
    | 'product'
    | 'magazine'
    | 'inquiry'
    | 'community'
    | 'comment'
    | 'partnership';
  hidden?: boolean;
  handleCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  padding?: React.CSSProperties['padding'];
}

const Table = (props: TableProps) => {
  const { tab = 'product', hidden = true, padding, handleCheckbox } = props;

  const table = React.useMemo(() => {
    if (tab === 'product')
      return [
        { title: '사진', width: '196px' },
        { title: '차량정보', width: '100%' },
        { title: '연식', width: '100px' },
        { title: '연료', width: '100px' },
        { title: '주행', width: '100px' },
        { title: '가격', width: '100px' },
        { title: '판매자', width: '100px' },
      ];
    if (tab === 'magazine') return [];
    if (tab === 'community' || tab === 'comment')
      return [
        { title: '사진', width: '196px' },
        { title: '제목', width: '100%' },
        { title: '작성자', width: '200px' },
        { title: '작성일', width: '80px' },
        { title: '조회', width: '80px' },
        { title: '추천', width: '80px' },
      ];
    if (tab === 'partnership')
      return [
        { title: '사진', width: '196px' },
        { title: '업체명', width: '404px' },
        { title: '업종', width: '120px' },
        { title: '영업시간', width: '118px' },
        { title: '전화', width: '145px' },
        { title: '지역', width: '134px' },
        { title: '사이트', width: '85px' },
      ];
    return [
      { title: '문의 유형', width: '196px' },
      { title: '제목', width: '100%' },
      { title: '문의일', width: '140px' },
      { title: '상태', width: '140px' },
    ];
  }, [tab]);
  return (
    <Wrapper
      css={css`
        display: flex;
        border-radius: 4px;
        padding: ${padding};
        ${applyMediaQuery('mobile')} {
          display: none;
        }
      `}
    >
      {hidden && (
        <Wrapper.Item
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${theme.color['greyScale-2']};
            padding: 0 11.5px;
          `}
        >
          <FormCheckbox name="check" id="check" onChange={handleCheckbox} />
        </Wrapper.Item>
      )}
      {table.map((value) => (
        <Wrapper.Item
          key={value.title}
          css={css`
            flex: ${value.width === '100%' ? 1 : undefined};
            width: ${value.width === '100%' ? undefined : value.width};
            text-align: center;
            padding: 10px 0;
            background: ${theme.color['greyScale-2']};
          `}
        >
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-6"
          >
            {value.title}
          </Typography>
        </Wrapper.Item>
      ))}
    </Wrapper>
  );
};

export { Table };
export type { TableProps };
