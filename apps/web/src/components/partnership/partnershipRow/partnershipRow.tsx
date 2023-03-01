import { Container, Typography, Wrapper } from '@supercarmarket/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { PartnershipDto } from 'types/partnership';

import { css } from 'styled-components';
import { Params, WithBlurredImage } from '@supercarmarket/types/base';

const PartnershipRow = ({
  brdSeq,
  base64,
  partnerName,
  category,
  workTime,
  phone,
  address,
  siteUrl,
  imgSrc,
}: WithBlurredImage<PartnershipDto>) => {
  const { query } = useRouter();
  delete query.pid;
  const queryString = new URLSearchParams(query as Params).toString();

  return (
    <Container
      width="100%"
      display="flex"
      alignItems="center"
      borderBottom="1px solid #EAEAEC"
    >
      <Link
        href={`/partnership/detail/${brdSeq}?${queryString}`}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image
          width={196}
          height={124}
          placeholder={base64 ? 'blur' : undefined}
          blurDataURL={base64 ? base64 : undefined}
          src={imgSrc}
          alt="thumbnail"
          style={{ borderRadius: '4px' }}
          sizes="100%"
        />
        <Wrapper.Item
          css={css`
            flex: 1;
            width: 403px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 12px;
          `}
        >
          <Typography
            fontSize="body-24"
            fontWeight="bold"
            style={{ padding: '0 30px' }}
          >
            {partnerName}
          </Typography>
          <Typography
            fontSize="body-14"
            color="greyScale-5"
            style={{ padding: '0 30px' }}
          >
            {address}
          </Typography>
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            display: flex;
            & > span {
              text-align: center;
            }
          `}
        >
          <Typography fontSize="body-14" style={{ width: '120px' }}>
            {category}
          </Typography>
          <Typography fontSize="body-14" style={{ width: '119px' }}>
            {workTime}
          </Typography>
          <Typography fontSize="body-14" style={{ width: '142px' }}>
            {phone}
          </Typography>
          <Typography fontSize="body-14" style={{ width: '137px' }}>
            {address.split(' ').slice(0, 2).join(' ')}
          </Typography>
        </Wrapper.Item>
      </Link>
      <Link
        href={siteUrl}
        style={{
          display: 'inline-block',
          width: '80px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography
          fontSize="body-14"
          style={{
            textDecorationLine: 'underline',
          }}
        >
          바로가기
        </Typography>
      </Link>
    </Container>
  );
};

export default PartnershipRow;
