export enum SettingsType {
  Mock = 'mock',
}

export interface Settings {
  [SettingsType.Mock]: 'mock'
}

export interface GetSettingsResult extends Settings {}

export interface PatchSettingsData extends Partial<Settings> {}

export interface PatchSettingsResult {
  isSuccess: boolean
}
