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

const scrollToPosition = (node: Element, opts?: ScrollOptions): void => {
  const htmlNode = getScrollNode()
  const nodeOffset = node.getBoundingClientRect()
  const nodePosition = htmlNode.scrollTop + nodeOffset.top + (opts?.offset || 0)
  const scrollTo = Math.floor(nodePosition)

  if (!opts?.smooth) {
    requestAnimationFrame(() => (htmlNode.scrollTop = scrollTo))
    return
  }

  scroll.top(htmlNode, scrollTo, {
    duration: opts?.duration,
    ease: opts?.ease
  })
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
