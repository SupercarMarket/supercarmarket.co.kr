import { ComponentMeta, ComponentStory } from '@storybook/react';

import Searchbar from './searchbar';

export default {
  title: 'Design System/Common/Searchbar',
  component: Searchbar,
} as ComponentMeta<typeof Searchbar>;

const Template: ComponentStory<typeof Searchbar> = (args) => (
  <Searchbar {...args} />
);

export const Grey = Template.bind({});

Grey.argTypes = {
  variant: {
    name: 'Variant',
    description: '서치바의 스타일을 위한 프롭스',
    options: ['Grey', 'Line'],
    control: {
      type: 'select',
    },
  },
  border: {
    name: 'Border',
    description: '서치바의 보더 스타일을 위한 프롭스',
    options: ['normal', 'rounded'],
    control: {
      type: 'select',
    },
  },
};

Grey.args = {
  placeholder: '검색어를 입력해주세요.',
  width: '507px',
  variant: 'Grey',
  border: 'rounded',
};

export const Line = Template.bind({});

Line.argTypes = {
  ...Grey.argTypes,
};

Line.args = {
  placeholder: '검색어를 입력해주세요.',
  width: '880px',
  variant: 'Line',
  border: 'normal',
};
