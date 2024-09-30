import { InjectionToken } from "@angular/core";

export const Window = new InjectionToken<Window>("Window");

export function windowFactory(): Window {
  return window;
}

export const WindowProvider = [
  {
    provide: Window,
    useFactory: windowFactory,
  },
];
