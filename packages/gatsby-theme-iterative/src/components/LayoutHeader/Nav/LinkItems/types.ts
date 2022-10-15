import { ScreenSize } from './getShowOnClass'

export type PopupName = 'CommunityPopup' | 'OtherToolsPopup'

interface INavLinkCommonData {
  showOn?: ScreenSize
  text: string
}

export interface INavLinkData extends INavLinkCommonData {
  href: string
  eventType: string
}

export interface INavLinkPopupData extends INavLinkCommonData {
  popup: PopupName
}
