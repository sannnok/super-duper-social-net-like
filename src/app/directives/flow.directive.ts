import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { interval, timer } from 'rxjs';
import { generatePerlinNoise } from '../utils/utils';

interface Particular {
  startPoint: {x: number, y: number},
  noiseTrack: number[],
  div: HTMLDivElement,
  currentDrawIndex: number,
  isSum: boolean;
}

@Directive({
  selector: '[appFlow]'
})
export class FlowDirective {
  flowing: boolean = false;

  mouse = {
    x: 0,
    y: 0
  }

  options = {
    trailLength: 20,
    size: 50,
    interval: 30,
  };

  intervalMs    = this.options.interval || 15;
  particulars: Particular[] = [];

  @HostListener('mousedown', ['$event']) public onMouseDown(event: MouseEvent) {
    this.flowing = true;
    this.defineEventSource(event);
    console.log('click');
  }
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
    console.log('tap');

  }
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
    let noise = generatePerlinNoise(1, 1000, {
      octaveCount: 10,
      persistence: 0.2,
      amplitude: 0.01
    })

    return noise.map(n => Number(n.toString().split('').splice(3, 2).join('')) * 1)
  }

  private initUpdates() {
    interval(this.intervalMs).subscribe(() => this.updateTrackPositions())
  }

  private updateTrackPositions() {
    for (var i = 0; i < this.particulars.length; i++) {
      const curParticular = this.particulars[i];
      const startPoint = curParticular.startPoint;
      const noisefuncForThisPoint = curParticular.noiseTrack;

      if (curParticular.currentDrawIndex == 0) {
        curParticular.currentDrawIndex = Math.floor(Math.random() * curParticular.noiseTrack.length / 2);
      }

      const noiseX = curParticular.isSum
        ? curParticular.startPoint.x + noisefuncForThisPoint[curParticular.currentDrawIndex]
        : curParticular.startPoint.x - noisefuncForThisPoint[curParticular.currentDrawIndex];

      startPoint.y -= 1;
      const goingUpY = startPoint.y;

      curParticular.div.style.top = goingUpY + 'px';
      curParticular.div.style.left = noiseX + 'px';
      curParticular.currentDrawIndex++;
    }
  }

  private drawFlowing(x: number, y: number) {
    const div = this.renderer.createElement('div')
    const text = this.renderer.createText('❤️')
    this.renderer.appendChild(div, text)
    this.renderer.appendChild(document.body, div)
    this.renderer.addClass(div, 'heart')
    this.renderer.setStyle(div, 'top', y + 'px')
    this.renderer.setStyle(div, 'left', x + 'px')
    this.renderer.setStyle(div, 'transform', `translate(-50%, -50%)`)

    const particular: Particular = {
      div,
      noiseTrack: this.setTheNoise(),
      startPoint: {x, y},
      currentDrawIndex: 0,
      isSum: !!Math.floor(Math.random() * 2)
    }

    this.particulars.push(particular);

    timer(10000).subscribe(() => {
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
