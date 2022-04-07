export interface SidebarItem {
  label: string
  path: string
  source: string
  prev: string
  next: string
  icon?: string
  style?: string
  tutorials?: {
    katacoda: string
  }
  children?: SidebarItem[]
}

export const structure: SidebarItem[]

export function findChildWithSource(source: SidebarItem): SidebarItem

export function getFirstPage(): string

export function getItemByPath(path: string): SidebarItem

export function getItemBySource(source: string): SidebarItem | false

export function getPathWithSource(path: string): string

export function getParentsListFromPath(path: string): string[]
