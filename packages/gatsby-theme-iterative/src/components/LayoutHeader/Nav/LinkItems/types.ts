export type PopupName = 'CommunityPopup' | 'OtherToolsPopup'

export interface INavLinkData {
  href: string
  eventType: string
  text: string
}

export interface INavLinkPopupData {
  text: string
  popup: PopupName
}
