import scroll from 'scroll'
export { default as ease } from 'ease-component'

import isClient from './isClient'
import { allImagesLoadedInContainer } from './images'

const CONTENT_ROOT_ID = 'layoutContent'

export const getScrollPosition = (): number =>
  isClient ? window.pageYOffset : 0

export const getScrollNode = (): Element =>
  document.scrollingElement || document.documentElement

type ScrollOptions = {
  offset?: number
  waitImages?: boolean
} & {
  smooth?: true
  duration?: number
  ease?: (value: number) => number
}

const scrollToPosition = (node: Element, opts: ScrollOptions = {}): void => {
  return node.scrollIntoView({ behavior: opts.smooth ? 'smooth' : 'auto' })
}

export const scrollIntoLayout = (
  node: Element | null,
  opts?: ScrollOptions
): void => {
  if (!node) {
    return
  }

  if (!opts?.waitImages) {
    return scrollToPosition(node, opts)
  }

  const contentRoot = document.getElementById(CONTENT_ROOT_ID)
  if (contentRoot) {
    allImagesLoadedInContainer(contentRoot).then(() =>
      scrollToPosition(node, opts)
    )
  }
}
