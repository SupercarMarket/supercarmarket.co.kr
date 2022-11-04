import { ComponentMeta, ComponentStory } from '@storybook/react';
import MarketFilter from 'components/market/market-filter';

export default {
  title: 'Design System/Market/MarketFilter',
  component: MarketFilter,
} as ComponentMeta<typeof MarketFilter>;

const Template: ComponentStory<typeof MarketFilter> = (args) => (
  <MarketFilter {...args} />
);

export const Default = Template.bind({});

Default.argTypes = {};
