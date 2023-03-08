import { usePathname } from 'next/navigation';
import { getBrowserInfo, truncateOnWord } from '@supercarmarket/lib';
import { NextSeo, NextSeoProps } from 'next-seo';
import { seoConfig } from 'utils/next-seo.config';
import { APP_NAME, PRODUCT_URL } from 'constants/core';

type HeadSeoProps = {
  title: string;
  description: string;
  siteName?: string;
  url?: string;
  canonical?: string;
  nextSeoProps?: NextSeoProps;
  image?: string;
};

const buildSeoMeta = (pageProps: {
  title: string;
  description: string;
  image: string;
  siteName?: string;
  url?: string;
  canonical?: string;
}): NextSeoProps => {
  const {
    title,
    description,
    image,
    canonical,
    siteName = seoConfig.headSeo.siteName,
  } = pageProps;
  return {
    title: title,
    canonical: canonical,
    openGraph: {
      site_name: siteName,
      type: 'website',
      title: title,
      description: description,
      images: [
        {
          url: image,
        },
      ],
    },
    additionalMetaTags: [
      {
        property: 'name',
        content: title,
      },
      {
        property: 'description',
        content: description,
      },
      {
        name: 'description',
        content: description,
      },
      {
        property: 'image',
        content: image,
      },
    ],
  };
};

const HeadSeo = (props: HeadSeoProps): JSX.Element => {
  const url = getBrowserInfo()?.url;

  const isCalcom =
    url && new URL(url).hostname.endsWith('supercar-market.vercel.app');

  const path = usePathname();

  const supercarmarketCanonical = `${PRODUCT_URL}${
    path === '/' ? '' : path
  }`.split('?')[0];

  const defaultUrl = isCalcom ? supercarmarketCanonical : url;

  const {
    title,
    description,
    siteName,
    canonical = defaultUrl,
    nextSeoProps = {},
    image = '/images/logo/og.png',
  } = props;

  const truncatedDescription = truncateOnWord(description, 158);
  const pageTitle = title + ' | ' + APP_NAME;
  let seoProps = buildSeoMeta({
    title: pageTitle,
    image,
    description: truncatedDescription,
    canonical,
    siteName,
  });

  return <NextSeo {...seoProps} />;
};

export type { HeadSeoProps };
export default HeadSeo;
