import { Directive, HostListener, Renderer2 } from '@angular/core';
import { interval, timer } from 'rxjs';
import { throttle } from '../core/throttle.decorator';
import { Particular } from '../interfaces/core/particular.interface';
import { generatePerlinNoise } from '../utils/utils';

const OPTIONS = {
  intervalMs: 30,
  speed: 5,
  trailTailLive: 400,
  width: 15,
  soft: 7,
  persistence: 0.2,
  amplitude: 0.1,
};

@Directive({
  selector: '[appFlow]'
})
export class FlowDirective {
  private flowing: boolean = false;
  private particulars: Particular[] = [];

  @HostListener('mousedown', ['$event']) public onMouseDown(event: MouseEvent) {
    this.flowing = true;
    this.defineEventSource(event);
    console.log('mousedown');
  }
  @throttle(20)
  @HostListener('mousemove', ['$event']) public onMove(event: MouseEvent) {
    if (!this.flowing) return;
    this.defineEventSource(event);
  }
  @HostListener('mouseup', ['$event']) public onMouseUp(event: MouseEvent) {
    this.flowing = false;
  }
  
  @HostListener('touchstart', ['$event']) public onTouchStart(event: TouchEvent) {
    this.flowing = true;
    this.defineEventSource(event);
    console.log('touchstart');

  }
  @throttle(20)
  @HostListener('touchmove', ['$event']) public onTouchMove(event: TouchEvent) {
    if (!this.flowing) return;
    this.defineEventSource(event);
  }
  @HostListener('touchend', ['$event']) public onTouchEnd(event: TouchEvent) {
    this.flowing = false;
  }
  
  constructor(private renderer: Renderer2) {
    this.initUpdates();
  }

  private setTheNoise() {
    let noise = generatePerlinNoise(1, 1, {
      octaveCount: OPTIONS.soft,
      persistence: OPTIONS.persistence,
      amplitude: OPTIONS.amplitude,
    })

    return noise.map((n, i) => (Number(n.toString().split('').splice(3, 2).join('')) / 10 * OPTIONS.width) + i/13)
  }

  private initUpdates() {
    interval(OPTIONS.intervalMs).subscribe(() => this.updateTrackPositions())
  }

  private updateTrackPositions() {
    for (let i = 0; i < this.particulars.length; i++) {
      const curParticular = this.particulars[i];
      const startPoint = curParticular.startPoint;
      const noisefuncForThisPoint = curParticular.noiseTrack;

      if (curParticular.currentDrawIndex == 0) {
        curParticular.currentDrawIndex = Math.floor(Math.random() * curParticular.noiseTrack.length / 2);
      }

      const noiseX =  curParticular.startPoint.x - noisefuncForThisPoint[curParticular.currentDrawIndex];

      startPoint.y -= 1;
      const goingUpY = startPoint.y;

      curParticular.div.style.top = goingUpY + 'px';
      curParticular.div.style.left = noiseX + 'px';
      curParticular.currentDrawIndex++;
    }
  }

  private drawFlowing(x: number, y: number) {
    const div = this.renderer.createElement('div')
    this.renderer.addClass(div, 'heart')
    const text = this.renderer.createText('❤️')
    this.renderer.appendChild(div, text)
    this.renderer.setStyle(div, 'top', y + 'px')
    this.renderer.setStyle(div, 'left', x + 'px')
    this.renderer.setStyle(div, 'transform', `translate(-50%, -50%)`)
    this.renderer.appendChild(document.body, div)

    const particular: Particular = {
      div,
      noiseTrack: this.setTheNoise(),
      startPoint: {x, y},
      currentDrawIndex: 0,
      isSum: !!Math.floor(Math.random() * 2)
    }

    this.particulars.push(particular);

    timer(OPTIONS.trailTailLive / 2).subscribe(() => this.renderer.addClass(div, 'hide'))

    timer(OPTIONS.trailTailLive).subscribe(() => {
      this.particulars = this.particulars.filter(p => p.div !== div)
      this.renderer.removeChild(document.body, div)
    })
  }

  private defineEventSource(event: MouseEvent | TouchEvent) {
    let x: number, y: number;
    if(event instanceof MouseEvent) {
      x = event.clientX;
      y = event.clientY;
    } else {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }

    this.drawFlowing(x, y)
  }
}
