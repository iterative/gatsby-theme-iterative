import React, { PropsWithChildren, useEffect, useRef } from 'react'
import cx from 'classnames'

import { IPageProps } from '../Page'
import LayoutHeader from '../LayoutHeader'
import LayoutFooter from '../LayoutFooter'
import { handleFirstTab } from '../../utils/front/accessibility'

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

  return (
    <div className={cx('h-screen', className)}>
      <div className="h-full flex flex-col items-center" ref={rootRef}>
        <LayoutHeader modifiers={modifiers} root={rootRef.current} />
        <div id="layoutContent" className="flex-1">
          {children}
        </div>
        <LayoutFooter />
      </div>
    </div>
  )
}

export default MainLayout
