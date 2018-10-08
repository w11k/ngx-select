export interface NgxSelectModel<T> {
  label: string;
  value: T;
  selected?: boolean;
}

export enum NgxSelectToggleState {
  ALL = 'all',
  NONE = 'none'
}
