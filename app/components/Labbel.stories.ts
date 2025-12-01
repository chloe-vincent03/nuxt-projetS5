/* import type { Meta, StoryObj } from '@storybook/vue3-vite'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Labbel',
  component: MLabbel,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'success', 'error'] },
    size: { control: 'radio', options:['default', 'small', 'large'] },
    placeholder: { control: 'text' },
    type: {
      control: 'radio',
      options: ['text', 'email', 'password', 'number', 'tel', 'search', 'url', 'file']
    }
  },
  render: (args) => ({
    components: { MLabbel },
    setup () {
      return { args }
    },
    template: '<MLabbel v-bind="args" > Labbel </MLabbel '
  })
} satisfies Meta<typeof MLabbel>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.

export const Default: Story = {
  args:{
    variant: 'default',
    size: 'default'
  }
}

export const successsmall: Story = {
  args: {
    variant: 'success',
    type: 'text',
    size:'small'
  }
}

export const erroremaillarge: Story = {
  args: {
    variant: 'error',
    type: 'email',
    size: 'large'
  }
}

export const password: Story = {
  args: {
    type: 'password'
  }
}

export const file: Story = {
  args: {
    type: 'file'
  }
}
 */