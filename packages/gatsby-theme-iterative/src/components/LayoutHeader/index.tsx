import cn from 'classnames'
import React, { RefObject } from 'react'
import includes from 'lodash/includes'

import { LayoutModifiers, ILayoutModifiable } from '../MainLayout'
import LayoutWidthContainer from '../LayoutWidthContainer'
import Link from '../Link'
import Nav from './Nav'
import {
  HamburgerMenu,
  HamburgerButton,
  useHamburgerMenu
} from '../HamburgerMenu'

import { ReactComponent as LogoSVG } from '../../images/dvc_icon-color--square_vector.svg'
import * as styles from './styles.module.css'

import LayoutAlert from './alert'

const LayoutHeader: React.FC<
  Required<ILayoutModifiable> & { scrolled: boolean }
> = ({ modifiers, scrolled }) => {
  const { opened, handleToggle, handleItemClick } = useHamburgerMenu()
  const hasCollapsedModifier = includes(modifiers, LayoutModifiers.Collapsed)
  const hasHideAlertModifier = includes(modifiers, LayoutModifiers.HideAlert)
  const collapsed = opened || hasCollapsedModifier || scrolled

  return (
    <>
      <header id="header" data-collapsed={collapsed} className={styles.header}>
        {!hasHideAlertModifier && LayoutAlert && (
          <LayoutAlert collapsed={collapsed} />
        )}
        <LayoutWidthContainer
          className={cn(styles.container, collapsed && styles.collapsed)}
          wide
        >
          <Link
            href="/"
            className={styles.logoLink}
            title="DVC"
            aria-label="DVC"
          >
            <LogoSVG className={styles.logo} />
          </Link>
          <Link
            className={styles.company}
            href="https://iterative.ai/"
            target="_blank"
          >
            by <span className={styles.companyName}>iterative.ai</span>
          </Link>
          <Nav />
        </LayoutWidthContainer>
      </header>
      <HamburgerButton
        opened={opened}
        collapsed={collapsed}
        handleClick={handleToggle}
      />
      <HamburgerMenu
        opened={opened}
        collapsed={collapsed}
        handleToggle={handleToggle}
        handleItemClick={handleItemClick}
      />
    </>
  )
}

export default LayoutHeader
