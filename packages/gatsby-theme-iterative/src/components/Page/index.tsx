import React from 'react'

import DefaultSEO from './DefaultSEO'

import { useRedirects, useAnchorNavigation, useSmoothScroll } from './utils'

import 'reset-css'
import './base.css'
import './fonts/fonts.css'

import getLayoutComponent from './getLayoutComponent'

export interface IPageProps {
  location: {
    pathname: string
  }
  pageContext: {
    is404: boolean
    isDocs: boolean
    isAlertLanding: boolean
    pageInfo?: {
      currentPage: number
      nextPage?: string
    }
  }
  children: React.ReactNode
  enableSmoothScroll: boolean
}

const Page: React.FC<IPageProps> = props => {
  useAnchorNavigation()
  useSmoothScroll(props.enableSmoothScroll)

  const LayoutComponent = getLayoutComponent(props)

  return (
    <>
      <DefaultSEO pathname={props.location.pathname} />
      <LayoutComponent {...props} />
    </>
  )
}

export default Page
