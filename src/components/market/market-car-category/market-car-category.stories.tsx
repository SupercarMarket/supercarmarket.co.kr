import { ComponentMeta, ComponentStory } from '@storybook/react';
import MarketCarKind from 'components/market/market-car-category';
import { CATEGORY_VALUES } from 'constants/market';

export default {
  title: 'Design System/Market/MarketCarKind',
  component: MarketCarKind,
} as ComponentMeta<typeof MarketCarKind>;

const Template: ComponentStory<typeof MarketCarKind> = (args) => (
  <MarketCarKind {...args} />
);

export const Default = Template.bind({});

Default.argTypes = {
  category: {
    name: 'Category',
    description: '현재 필터링하는 차 종류를 나타내는 문자열',
    options: CATEGORY_VALUES,
    control: {
      type: 'select',
    },
  },
};

Default.args = {
  category: 'all',
};
