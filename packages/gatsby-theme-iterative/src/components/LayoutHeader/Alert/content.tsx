import React from 'react'
import Link from '../../Link'

export const AlertContent = () => (
  <>
    <span role="img" aria-label="rocket">
      🚀
    </span>{' '}
    New Release!{' '}
    <Link href="https://iterative.ai/blog/dvclive-metrics-studio/">
      Track and visualize DVC experiment metrics in real-time
    </Link>{' '}
    with Iterative Studio.
  </>
)
