import { SidebarItem } from './sidebar'

interface Redirect {
  regex: RegExp
  matchPathname: boolean
  replace: string
  code: number
}

export function buildSidebarRedirects(list: SidebarItem[]): string[]

export function processRedirectString(redirectString: string): Redirect

export function getRedirect(
  host: string,
  pathname: string,
  options?: { req: Request; dev: boolean }
): [number, string]

export function handleFrontRedirect(
  host: string,
  pathname: string,
  clickEvent?: MouseEvent
): void
