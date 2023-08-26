import React from 'react'
import cn from 'classnames'

import PseudoButton from '../../PseudoButton'
import SocialIcons from './SocialIcons'
import LinkItems from './LinkItems'
import Link from '../../Link'
import { ReactComponent as ExternalLinkIcon } from '../../../images/external-link-icon.svg'

import { logEvent } from '../../../utils/front/plausible'

import * as styles from './styles.module.css'

const Nav: React.FC = () => (
  <div className={styles.wrapper}>
    <LinkItems />
    <SocialIcons />
    <PseudoButton
      className={cn(styles.getStartedButton, 'btn-with-focus')}
      href="/doc/start"
      onClick={(): void => logEvent('Nav', { Item: 'get-started' })}
      size="none"
    >
      Get Started
    </PseudoButton>
    <div className="px-4">|</div>
    <Link href="https://cloud.dvc.ai">
      Get Enterprise{` `}
      <ExternalLinkIcon className="ml-1 inline" />
    </Link>
  </div>
)

export default Nav
