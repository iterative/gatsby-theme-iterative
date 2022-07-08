import React, { PropsWithChildren, useEffect, useRef } from 'react'
import cx from 'classnames'

import { IPageProps } from '../Page'
import LayoutHeader from '../LayoutHeader'
import LayoutFooter from '../LayoutFooter'
import { handleFirstTab } from '../../utils/front/accessibility'
import { useInView } from 'react-intersection-observer'

export enum LayoutModifiers {
  Wide,
  Collapsed,
  HideAlert
}

export interface ILayoutModifiable {
  modifiers?: Array<LayoutModifiers>
}

interface IMainLayoutProps {
  className?: string
}

export type LayoutComponent = React.FC<
  PropsWithChildren<IMainLayoutProps & IPageProps & ILayoutModifiable>
>

const MainLayout: LayoutComponent = ({
  className,
  children,
  modifiers = []
}) => {
  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)

    return (): void => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  const rootRef = useRef<HTMLDivElement>(null)

  const { ref, inView } = useInView({
    root: rootRef.current,
    threshold: 1
  })

  return (
    <div className={cx('h-screen flex flex-col items-center', className)}>
      <LayoutHeader modifiers={modifiers} scrolled={!inView} />
      <div
        className="flex flex-col items-center h-full w-full overflow-auto"
        ref={rootRef}
      >
        <div id="layoutContent" className="flex-1" ref={ref}>
          {children}
        </div>
        <LayoutFooter />
      </div>
    </div>
  )
}

export default MainLayout
