import React, { ReactNode, useEffect, useRef } from 'react'
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

  const rootRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView({ rootMargin: '40px 0px 0px 0px' })

  return (
    <>
      <LayoutHeader modifiers={modifiers} scrolled={!inView} />
      <main
        className={cn(
          'h-full',
          'min-h-full',
          'flex',
          'flex-col',
          'items-center',
          className
        )}
        ref={rootRef}
      >
        <div ref={ref} />
        <DefaultSEO pathname={location.pathname} />
        <div
          className={cn('flex', 'flex-col', 'items-center', 'h-full', 'w-full')}
        >
          <div id="layoutContent" className="flex-1">
            {children}
          </div>
          <LayoutFooter />
        </div>
      </main>
    </>
  )
}

export default MainLayout
