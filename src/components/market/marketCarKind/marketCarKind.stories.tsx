import { ComponentMeta, ComponentStory } from '@storybook/react';
import MarketCarKind from 'components/market/marketCarKind';

export default {
  title: 'Design System/Market/MarketCarKind',
  component: MarketCarKind,
} as ComponentMeta<typeof MarketCarKind>;

const Template: ComponentStory<typeof MarketCarKind> = () => <MarketCarKind />;

export const Default = Template.bind({});
