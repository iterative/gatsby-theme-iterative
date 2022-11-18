import React from 'react'
import Link from '../../Link'

export const AlertContent = () => (
  <>
    <span role="img" aria-label="rocket">
      🚀
    </span>{' '}
    New Release!{' '}
    <Link href="https://dvc.org/blog/iterative-studio-model-registry">
      Git-backed Machine Learning Model Registry
    </Link>{' '}
    for all your model management needs.
  </>
)
