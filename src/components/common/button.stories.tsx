import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.argTypes = {
  variant: {
    name: 'Variant',
    description: '버튼의 스타일을 위한 프롭스',
    options: ['Primary', 'Primary-Line', 'Line', 'Black'],
    control: {
      type: 'select',
    },
  },
  border: {
    name: 'Border',
    description: '버튼의 보더 스타일을 위한 프롭스',
    options: ['normal', 'rounded'],
    control: {
      type: 'select',
    },
  },
  fullWidth: {
    name: 'Full Width',
    description: '버튼의 fullWidth 여부를 위한 스타일 프롭스',
    type: 'boolean',
  },
  disabled: {
    name: 'Disabled',
    description: '버튼의 비활성화 스타일을 위한 프롭스',
    type: 'boolean',
  },
  active: {
    name: 'Active',
    description: '버튼의 활성화 스타일을 위한 프롭스',
    type: 'boolean',
  },
};

Primary.args = {
  children: 'Button',
};
