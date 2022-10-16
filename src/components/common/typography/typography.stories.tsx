import { ComponentMeta, ComponentStory } from '@storybook/react';
import theme from 'constants/theme';

import Typography from './typography';

export default {
  title: 'Design System/Common/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const Default = Template.bind({});

Default.argTypes = {
  fontSize: {
    name: 'Font Size',
    description: '폰트 사이즈 설정을 위한 프롭스',
    options: Object.keys(theme.fontSize),
    control: {
      type: 'select',
    },
  },
  fontWeight: {
    name: 'Font Weight',
    description: '폰트 두께 설정을 위한 프롭스',
    options: Object.keys(theme.fontWeight),
    control: {
      type: 'select',
    },
  },
  space: {
    name: 'Space',
    description: '줄바꿈을 허용하기 위한 프롭스',
    type: 'boolean',
  },
  lineHeight: {
    name: 'Line Height',
    options: ['120%', '150%'],
    control: {
      type: 'select',
    },
  },
};

Default.args = {
  fontSize: 'header-36',
  fontWeight: 'bold',
  lineHeight: '150%',
  as: 'h1',
  space: false,
  children: 'Hello World',
};
