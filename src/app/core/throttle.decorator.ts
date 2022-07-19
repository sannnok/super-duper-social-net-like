export function throttle(delay: number = 300): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let canRun = false;
    setInterval(() => {canRun = true}, delay) 
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (canRun) {
        original.apply(this, args)
        console.log('canRun permition - function called -> original')
        canRun = false;
      }
    };
    return descriptor;
  };
}
