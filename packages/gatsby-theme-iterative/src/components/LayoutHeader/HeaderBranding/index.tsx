import React from 'react'

import Link from '../../Link'
import { ReactComponent as LogoSVG } from '../../../images/dvc_icon-color--square_vector.svg'
import * as styles from './styles.module.css'

export const HeaderBranding = () => (
  <>
    <Link href="/" className={styles.logoLink} title="DVC" aria-label="DVC">
      <LogoSVG className={styles.logo} />
    </Link>
    <Link
      className={styles.company}
      href="https://iterative.ai/"
      target="_blank"
    >
      by <span className={styles.companyName}>iterative.ai</span>
    </Link>
  </>
)