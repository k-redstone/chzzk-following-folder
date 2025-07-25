export interface ISettingState {
  following: boolean
  category: boolean
  partner: boolean
  service: boolean
  chatting_power: boolean
}

export interface IImportMsg {
  message: string
  variant: 'error' | 'success'
}
