import { InjectionToken, FactoryProvider } from "@angular/core";

export const Window = new InjectionToken<Window>("WindowToken");

const windowFactory = (): Window => window;

export const WindowService: FactoryProvider = {
  provide: Window,
  useFactory: windowFactory,
};
