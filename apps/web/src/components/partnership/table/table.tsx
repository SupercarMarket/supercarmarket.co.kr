import { Typography } from '@supercarmarket/ui';
import PartnershipCard from 'components/partnership/partnershipCard';
import * as React from 'react';
import { WithBlurredImage } from '@supercarmarket/types/base';
import { PartnershipDto } from '@supercarmarket/types/partnership';

import * as Styled from './table.styled';

interface TableProps {
  data: WithBlurredImage<PartnershipDto>[];
  marginBottom?: string;
  tableHeaders: {
    title: string;
    width?: string;
  }[];
}

const Table = ({ data, tableHeaders, marginBottom = '80px' }: TableProps) => {
  return (
    <Styled.Table marginBottom={marginBottom}>
      <Styled.THead>
        <Styled.TableRow>
          {tableHeaders.map(({ title, width }) => (
            <Styled.TableHead width={width} key={title}>
              <Typography fontSize="body-14">{title}</Typography>
            </Styled.TableHead>
          ))}
        </Styled.TableRow>
      </Styled.THead>
      <Styled.TBody>
        {data.map((p) => (
          <PartnershipCard key={p.brdSeq} {...p} />
        ))}
      </Styled.TBody>
    </Styled.Table>
  );
};

export default Table;
