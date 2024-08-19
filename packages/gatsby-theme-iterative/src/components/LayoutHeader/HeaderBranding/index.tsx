import Link from '../../Link'
import { ReactComponent as LogoSVG } from '../../../images/dvc_icon-color--square_vector.svg'
import * as styles from './styles.module.css'
import LogoGradient from '../../LogoGradient'

export const HeaderBranding = () => (
  <>
    <Link href="/" className={styles.logoLink} title="DVC" aria-label="DVC">
      <LogoSVG className={styles.logo} />
    </Link>
    <LogoGradient className="mr-auto text-sm" href="https://dvc.ai/">
      by <span className="font-extrabold">Iterative</span>
    </LogoGradient>
  </>
)
