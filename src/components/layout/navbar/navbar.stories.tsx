import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Navbar from './navbar';

export default {
  title: 'Design System/Layout/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});

Default.argTypes = {};

Default.args = {
  navlinks: [
    {
      title: '매장',
      link: 'market',
      subMenu: [
        {
          title: '스포츠카',
          link: '스포츠카',
        },
        {
          title: '세단',
          link: '세단',
        },
        {
          title: 'SUV',
          link: 'SUV',
        },
        {
          title: '픽업트럭',
          link: '픽업트럭',
        },
        {
          title: '클래식카&올드카',
          link: '클래식카&올드카',
        },
      ],
    },
    {
      title: '슈마매거진',
      link: 'magazine',
    },
    {
      title: '커뮤니티',
      link: 'community',
      subMenu: [
        {
          title: '파파라치',
          link: '파파라치',
        },
        {
          title: '자료실',
          link: '자료실',
        },
      ],
    },
    {
      title: '제휴업체',
      link: 'partnership',
      subMenu: [
        {
          title: '자동차매장',
          link: '자동차매장',
        },
        {
          title: '공업사',
          link: '공업사',
        },
        {
          title: '디테일링',
          link: '디테일링',
        },
        {
          title: '도색',
          link: '도색',
        },
        {
          title: '기타',
          link: '기타',
        },
      ],
    },
  ],
};
