import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Header from './header';

export default {
  title: 'Design System/Layout/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Default = Template.bind({});

Default.argTypes = {};

Default.args = {};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
};
