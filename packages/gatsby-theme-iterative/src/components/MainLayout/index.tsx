import React, { PropsWithChildren, useEffect } from 'react'

import { IPageProps } from '../Page'
import LayoutHeader from '../LayoutHeader'
import LayoutFooter from '../LayoutFooter'
import { handleFirstTab } from '../../utils/front/accessibility'

import * as styles from './styles.module.css'

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
    if (className) {
      document.body.classList.add(className)

      return (): void => {
        document.body.classList.remove(className)
      }
    }
  }, [className])

  useEffect(() => {
    document.body.classList.add(styles.mainLayout)
    window.addEventListener('keydown', handleFirstTab)

    return (): void => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  return (
    <div className="h-full flex flex-col items-center">
      <LayoutHeader modifiers={modifiers} />
      <div id="layoutContent" className="flex-1">
        {children}
      </div>
      <LayoutFooter />
    </div>
  )
}

export default MainLayout
