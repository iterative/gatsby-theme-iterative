import React, { ReactNode, useEffect } from 'react'
import { PageProps } from 'gatsby'
import cn from 'classnames'

import 'reset-css'
import './base.css'
import LayoutHeader from '../LayoutHeader'
import LayoutFooter from '../LayoutFooter'
import { handleFirstTab } from '../../utils/front/accessibility'
import { useInView } from 'react-intersection-observer'
import DefaultSEO from './DefaultSEO'
import { useRedirects } from './utils'

export enum LayoutModifiers {
  Wide,
  Collapsed,
  HideAlert
}

export interface ILayoutModifiable {
  modifiers?: Array<LayoutModifiers>
}

export interface ILayoutComponentProps extends ILayoutModifiable {
  location: PageProps['location']
  className?: string
  children?: ReactNode
}

const MainLayout = ({
  className,
  children,
  modifiers = [],
  location
}: ILayoutComponentProps) => {
  useRedirects()

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)

    return (): void => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  const { ref, inView } = useInView({ rootMargin: '40px 0px 0px 0px' })

  return (
    <>
      <div
        className={cn(
          'h-full',
          'w-full',
          'flex',
          'flex-col',
          'flex-nowrap',
          'items-center'
        )}
      >
        <LayoutHeader modifiers={modifiers} scrolled={!inView} />
        <div
          className={cn(
            'h-full',
            'w-full',
            'overflow-y-auto',
            'flex-grow',
            'flex',
            'flex-col',
            'flex-nowrap',
            'items-center'
          )}
        >
          <div ref={ref} />
          <main
            className={cn(
              'w-full',
              'grow',
              'flex',
              'flex-col',
              'flex-nowrap',
              'items-center',
              className
            )}
          >
            <DefaultSEO pathname={location.pathname} />
            <div id="layoutContent" className={cn('grow')}>
              {children}
            </div>
          </main>
          <LayoutFooter />
        </div>
      </div>
    </>
  )
}

export default MainLayout
