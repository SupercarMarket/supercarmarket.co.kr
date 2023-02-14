import {
  Button,
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import type {
  MagazineDto,
  MagazineResponse,
  WithBlurredImage,
} from '@supercarmarket/types/magazine';
import clsx from 'clsx';
import useMagazine from 'hooks/queries/useMagazine';
import Image from 'next/image';
import { css } from 'styled-components';

import Arrow from '../../../assets/svg/arrow-right.svg';

interface MagazineBannerProps {
  reverse?: boolean;
  className?: string;
  button?: boolean;
  initialData?: MagazineResponse<WithBlurredImage<MagazineDto>>;
}

const MagazineBanner = ({
  reverse,
  button,
  className,
  initialData,
}: MagazineBannerProps) => {
  const { data: magazine } = useMagazine(0, {
    initialData,
  });

  return (
    <Container width="100%" className={className}>
      {magazine && (
        <Wrapper
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 75px;
            ${reverse && 'flex-direction: row-reverse;'}
            ${applyMediaQuery('mobile')} {
              flex-direction: column-reverse;
              gap: 20px;
            }
          `}
        >
          <Wrapper.Item
            css={css`
              width: 590px;
              height: 394px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 16px;
              fill: #fff;

              ${applyMediaQuery('mobile')} {
                width: 375px;
                height: 233px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
              }
            `}
          >
            <Typography
              as="span"
              color="system-1"
              style={{
                width: '100%',
                textAlign: 'start',
              }}
            >
              NEW
            </Typography>
            <Typography
              as="h1"
              fontSize="header-36"
              fontWeight="bold"
              color="black"
              lineHeight="150%"
              className={clsx('mb-contents-heading')}
            >
              {magazine.data[0].title}
            </Typography>
            <Typography
              as="p"
              fontSize="body-16"
              color="black"
              fontWeight="regular"
              lineHeight="150%"
              className={clsx('mb-contents-body', {
                [`mb-button`]: button,
              })}
            >
              {magazine.data[0].contents}
            </Typography>
            {button && (
              <Wrapper.Item
                css={css`
                  width: 100%;
                  display: flex;
                `}
              >
                <Button
                  variant="Black"
                  border="rounded"
                  type="button"
                  suffix={<Arrow />}
                >
                  보러가기
                </Button>
              </Wrapper.Item>
            )}
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              position: relative;
              width: 590px;
              height: 394px;
              gap: 16px;
              ${applyMediaQuery('mobile')} {
                width: 375px;
                height: 264px;
              }
            `}
          >
            <Image
              src={magazine.data[0].imgSrc}
              alt="thumbnail"
              fill
              placeholder="blur"
              blurDataURL={magazine.data[0].base64}
              style={{
                borderRadius: '4px',
              }}
              priority
            />
          </Wrapper.Item>
        </Wrapper>
      )}
    </Container>
  );
};

export default MagazineBanner;
