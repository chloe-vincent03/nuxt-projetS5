import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';


import MButton from './MButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Button',
  component: MButton ,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'tiny', 'large', 'default'] },
    variant: {control: 'radio', options:['default', 'outline']},
    href: { control: 'text' },
  },
  render: (args: any) => ({
    components: { MButton },
    setup() {
      return { args };
    },
    template: '<MButton v-bind="args" > clik me </MButton ',
  }),
} satisfies Meta<typeof MButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {};

export const outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const SmallOutline: Story = {
  args: {
    variant: 'outline',
    size: 'small',
  },
};
