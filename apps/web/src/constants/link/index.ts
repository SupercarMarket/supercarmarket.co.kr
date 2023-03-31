import { type UrlObject } from 'url';

export type Href = string | UrlObject;

export type Links = {
  title: string;
  href: Href;
  children?: Links[];
};
