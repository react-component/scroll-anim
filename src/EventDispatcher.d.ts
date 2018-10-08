type ICallback = (e?: { type: string, target: HTMLElement }) => void;
export default class EventDispatcher {
  static addEventListener(
    type: string,
    callback: ICallback,
    target: HTMLElement
  ): void;
  static removeEventListener(
    type: string, 
    callback: ICallback, 
    target: HTMLElement, 
    force?: boolean
  ): void;
  static removeAllType(type: string, target: HTMLElement): void;
  static reAllType(type: string, target: HTMLElement): void
}