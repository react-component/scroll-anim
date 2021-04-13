import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export declare type IPlayScaleType = number | string | [number | string, number | string];

export interface IChangeCallBackType {
  mode: 'enter' | 'leave',
  id: string
}

export interface IScrollCallBackType {
  id: string,
  domEvent: Event,
  scrollTop: number,
  offsetTop: number,
  showHeight: number
}

export interface IProps<T> extends Omit<React.HTMLAttributes<T>, 'onChange' | 'onScroll'> {
  targetId?: string;
  playScale?: IPlayScaleType;
  replay?: boolean;
  location?: string;
  onChange?: (e: IChangeCallBackType) => void;
  onScroll?: (e: IScrollCallBackType) => void;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class RcScrollElement<T> extends React.Component<IProps<T>> {

}
