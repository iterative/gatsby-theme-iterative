import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocationProvider } from '@reach/router'

import Header from '../components/LayoutHeader'

export default {
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => (
  <LocationProvider>
    <Header {...args} />
  </LocationProvider>
)

export const Default = Template.bind({})
Default.args = {}
