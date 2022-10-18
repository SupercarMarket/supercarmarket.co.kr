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
      link: 'shops',
    },
    {
      title: '슈마매거진',
      link: 'magazine',
    },
    {
      title: '커뮤니티',
      link: 'community',
    },
    {
      title: '제휴업체',
      link: 'partnership',
    },
  ],
};
