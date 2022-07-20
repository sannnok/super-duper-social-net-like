import { timer } from "rxjs";

export function throttle(interval: number = 300): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let throttlePause = false;
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {

      if(throttlePause) return;

      throttlePause = true;

      timer(interval).subscribe(() => {

        original.apply(this, args);

        throttlePause = false;

      });
    };

    return descriptor;
  };
}
