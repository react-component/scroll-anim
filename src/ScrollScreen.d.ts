import { IEaseType } from 'rc-tween-one/typings/AnimObject';

export interface IVarsProps {
  duration?: number;
  ease?: IEaseType;
  docHeight?: number;
  loop?: boolean;
  scrollInterval?: number;
}

export default class RcSCrollScreen {
  static init: (vars?: IVarsProps) => void;
  static unMount: () => void;
}