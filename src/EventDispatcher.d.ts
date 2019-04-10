type ICallback = (e?: { type: string, target: HTMLElement }) => void;
export default class EventDispatcher {
  public static addEventListener(
    type: string,
    callback: ICallback,
    target: HTMLElement
  ): void;
  public static removeEventListener(
    type: string, 
    callback: ICallback, 
    target: HTMLElement, 
    force?: boolean
  ): void;
  public static removeAllType(type: string, target: HTMLElement): void;
  public static reAllType(type: string, target: HTMLElement): void
}