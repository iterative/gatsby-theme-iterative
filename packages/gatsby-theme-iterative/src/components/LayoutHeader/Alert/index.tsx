import cn from 'classnames'
import React from 'react'

import { AlertContent } from './content'

import * as styles from './styles.module.css'

const LayoutAlert: React.FC<{ collapsed: boolean }> | false = ({
  collapsed
}) => (
  <div
    className={cn(
      styles.alert,
      'w-full',
      'transition-all',
      'ease-in-out',
      'delay-150',
      'white-space-nowrap',
      'text-center',
      collapsed ? 'h-0' : 'h-7'
    )}
  >
    <AlertContent />
  </div>
)

export default LayoutAlert
