import { Typography } from '@supercarmarket/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { WithBlurredImage } from 'types/magazine';
import { PartnershipDto } from 'types/partnership';

import * as Styled from './partnershipRow.styled';

const PartnershipRow = ({
  brdSeq,
  base64,
  partnerName,
  description,
  category,
  workTime,
  phone,
  address,
  siteUrl,
  imgSrc,
}: WithBlurredImage<PartnershipDto>) => {
  const { push, asPath } = useRouter();

  const onClick = (brdSeq: string) => {
    const query = asPath.split('?')[1];
    push(`/partnership/detail/${brdSeq}?${query}`);
  };

  return (
    <Styled.TableRow key={brdSeq}>
      <Styled.TableData onClick={() => onClick(brdSeq)}>
        <Image
          width={196}
          height={124}
          placeholder="blur"
          blurDataURL={base64}
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
        />
      </Styled.TableData>
      <Styled.TableData>
        <Styled.Description>
          <Typography fontSize="body-24" fontWeight="bold">
            {partnerName}
          </Typography>
          <Typography fontSize="body-14" color="greyScale-5">
            {address}
          </Typography>
        </Styled.Description>
      </Styled.TableData>
      <Styled.TableData>
        <Typography fontSize="body-14">{category}</Typography>
      </Styled.TableData>
      <Styled.TableData>
        <Typography fontSize="body-14">{workTime}</Typography>
      </Styled.TableData>
      <Styled.TableData>
        <Typography fontSize="body-14">{phone}</Typography>
      </Styled.TableData>
      <Styled.TableData>
        <Typography fontSize="body-14">
          {address.split(' ').slice(0, 2).join(' ')}
        </Typography>
      </Styled.TableData>
      <Styled.TableData>
        <Link href={siteUrl}>
          <Typography
            fontSize="body-14"
            style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
          >
            바로가기
          </Typography>
        </Link>
      </Styled.TableData>
    </Styled.TableRow>
  );
};

export default PartnershipRow;
