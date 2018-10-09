import * as React from 'react';
import { IEaseCallBack, IAnimType, IEaseType, IBezierProps, IChildrenProps, IStyleAnimProps } from 'rc-tween-one/typings/AnimObject';

export interface IAnimProps extends IStyleAnimProps {
  playScale?: number[];
  type?: IAnimType;
  duration?: number;
  delay?: number;
  // repeat?: number;
  // repeatDelay?: number;
  appearTo?: number;
  // yoyo?: boolean;
  ease?: IEaseType;
  style?: IStyleAnimProps;
  // morphPlugin
  points?: string;
  d?: string;
  // attr svg
  cx?: number;
  cy?: number;
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  rx?: number;
  ry?: number;
  dx?: number;
  dy?: number;
  offset?: number | string;
  stdDeviation?: number | string;
  stopColor?: string;
  stopOpacity?: number;
  onStart?: () => void;
  onStartBack?: () => void;
  onUpdate?: (e: number) => void;
  onComplete?: () => void;
  onCompleteBack?: () => void;
}
export declare type IAnimationType = IAnimProps | IAnimProps[];

export interface IProps<T> extends React.HTMLAttributes<T> {
  animation: IAnimationType
  location?: string;
  always?: boolean;
  targetId?: string;
  component?: string | React.ReactNode;
  componentProps?: {};
}

export default class RcScrollParallax<T> extends React.Component<IProps<T>> {

}