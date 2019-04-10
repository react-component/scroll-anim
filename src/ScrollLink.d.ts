import { IEaseType } from 'rc-tween-one/typings/AnimObject';
import * as React from 'react';
import { Omit } from './ScrollElement';

export interface IProps<T> extends Omit<React.HTMLAttributes<T>, 'onFocus'> {
  to: string
  toHash?: boolean;
  duration?: number;
  ease?: IEaseType;
  active?: string;
  showHeightActive?: string | number | [string | number, string | number];
  toShowHeight?: boolean;
  offsetTop?: number;
  targetId?: string;
  onFocus?: (e: { target: HTMLElement, to: string }) => void;
  onBlur?: () => void;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class RcScrollLink<T> extends React.Component<IProps<T>> {

}