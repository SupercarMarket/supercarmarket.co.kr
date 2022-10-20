import { ComponentMeta, ComponentStory } from '@storybook/react';

import MagazineBanner from './magazineBanner';

export default {
  title: 'Design System/Magazine/Banner',
  component: MagazineBanner,
} as ComponentMeta<typeof MagazineBanner>;

const Template: ComponentStory<typeof MagazineBanner> = (args) => (
  <MagazineBanner {...args} />
);

export const Default = Template.bind({});

Default.argTypes = {};

Default.args = {};
