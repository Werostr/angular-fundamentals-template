// import { InjectionToken, FactoryProvider } from "@angular/core";

// export const Window = new InjectionToken<Window>("WindowToken");

// const windowFactory = (): Window => window;

// export const WindowService: FactoryProvider = {
//   provide: Window,
//   useFactory: windowFactory,
// };
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
