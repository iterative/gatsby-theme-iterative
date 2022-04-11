import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocationProvider } from '@reach/router'

import 'reset-css'
import '../components/Page/base.css'
import '../components/Page/fonts/fonts.css'

import MainLayout from '../components/MainLayout'

export default {
  component: MainLayout,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof MainLayout>

const Template: ComponentStory<typeof MainLayout> = args => (
  <LocationProvider>
    <MainLayout {...args} />
  </LocationProvider>
)

export const Default = Template.bind({})
Default.args = {}
