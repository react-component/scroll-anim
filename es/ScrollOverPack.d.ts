import * as React from 'react';
import ScrollElement from './ScrollElement';

export interface IProps {
  always?: boolean;
  appear?: boolean;
}

export default class RcScrollOverPack extends ScrollElement<IProps> {
}