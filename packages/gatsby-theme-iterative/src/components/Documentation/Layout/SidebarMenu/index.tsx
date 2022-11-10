import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from '@reach/router'
import cn from 'classnames'

import { getParentsListFromPath } from '../../../../utils/shared/sidebar'

import * as styles from './styles.module.css'

import InnerSidebar from './InnerSidebar'

export type SidebarItemClickHandler = (isLeafItemClicked: boolean) => void

interface ISidebarMenuProps {
  currentPath: string
  onClick: SidebarItemClickHandler
}

const SidebarMenu: React.FC<ISidebarMenuProps> = ({ currentPath, onClick }) => {
  const location = useLocation()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isScrollHidden, setIsScrollHidden] = useState(false)
  const activePaths = currentPath
    ? getParentsListFromPath(currentPath)
    : undefined

  const scrollToActiveItem = (): void => {
    const node = document.getElementById(currentPath)
    const parent = rootRef.current

    setIsScrollHidden(true)
    setTimeout(() => {
      if (node && parent) {
        const parentHeight = parent.clientHeight
        const parentScroll = parent.scrollTop
        const nodeOffset = node.offsetTop
        const nodeHeight = node.clientHeight
        const scrollOffset = nodeOffset - parentHeight + nodeHeight

        if (
          parentScroll > nodeOffset + nodeHeight ||
          parentScroll + parentHeight < nodeOffset
        ) {
          parent.scrollTop = scrollOffset
        }
      }

      setIsScrollHidden(false)
    }, 400)
  }

  useEffect(() => {
    scrollToActiveItem()
  }, [])
  useEffect(scrollToActiveItem, [location.pathname])

  return (
    <div
      className={cn(styles.menu, isScrollHidden && styles.isScrollHidden)}
      ref={rootRef}
    >
      <InnerSidebar onClick={onClick} activePaths={activePaths} />
    </div>
  )
}

export default SidebarMenu
