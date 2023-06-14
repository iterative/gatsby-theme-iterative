import React from 'react'
import Link from '../../Link'

export const AlertContent = () => (
  <>
    <span role="img" aria-label="rocket">
      🚀
    </span>{' '}
    New Release!{' '}
    <Link href="https://iterative.ai/blog/dvc-3.0-ml-experiments-data-versioning/">
      DVC 3.0: Beyond the Command Line with Enhanced ML Experiments and Data
      Versioning
    </Link>{' '}
  </>
)
