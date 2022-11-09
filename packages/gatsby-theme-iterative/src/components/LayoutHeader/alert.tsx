import cn from 'classnames'
import React from 'react'

import Link from '../Link'

import * as styles from './styles.module.css'

const LayoutAlert: React.FC<{ collapsed: boolean }> | false = ({
  collapsed
}) => (
  <div
    className={cn(
      styles.alert,
      'transition-all',
      'ease-in-out',
      'delay-150',
      collapsed ? ['h-0'] : ['h-7']
    )}
  >
    <span role="img" aria-label="rocket">
      🚀
    </span>{' '}
    <Link href="https://studio.iterative.ai">DVC Studio</Link>, the online UI
    for DVC, is live!{' '}
  </div>
)

export default LayoutAlert
