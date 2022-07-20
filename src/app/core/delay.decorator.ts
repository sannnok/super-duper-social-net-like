import { Subscription, timer } from "rxjs";
import { FlowDirective } from "../directives/flow.directive";

interface MetadataValues extends PropertyDescriptor, FlowDirective {
  resetSubscribed: Subscription;
  subscriptionToStopDelay: Subscription;
  delayInProcess: boolean;
  safeRunId: any[];
}

export function delay<T extends { subscribe: (par: any) => Subscription}>(time: number = 300, subscribable?: T): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: Partial<MetadataValues>) {
    const original = descriptor.value;
    
    const initDelay = function (this: Partial<MetadataValues>){
      this.delayInProcess = true;

      return timer(time).subscribe(() => this.delayInProcess = false)
    }

    descriptor.value = function (...args: any[]) {
      if (!this.subscriptionToStopDelay) this.subscriptionToStopDelay = initDelay.call(this);
      if (!this.safeRunId) this.safeRunId = [];

      this.safeRunId?.push(setTimeout(() => {
        if (this.delayInProcess) return;
        original.apply(this, args);
      }))

      if (!this.resetSubscribed && subscribable) {
        this.resetSubscribed = subscribable.subscribe(() => {
          console.log('únsub', this.safeRunId?.length) 
          this.safeRunId?.forEach(id => {
            clearTimeout(id);
            this.safeRunId?.pop();
          });
          
          this.subscriptionToStopDelay?.unsubscribe();
          this.subscriptionToStopDelay = undefined;
        });
      }
    };

    return descriptor;
  };
}
