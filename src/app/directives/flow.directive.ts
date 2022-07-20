import { Directive, HostListener, Renderer2 } from '@angular/core';
import { interval, Subject, timer } from 'rxjs';
import { delay } from '../core/delay.decorator';
import { throttle } from '../core/throttle.decorator';
import { Particular } from '../interfaces/core/particular.interface';
import { MobileDetectorService } from '../services/core/mobile-detector.service';
import { generatePerlinNoise } from '../utils/utils';

const RESET_DELAY = new Subject();
   
const OPTIONS = {
  intervalMs: 50,
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
  private restrictMousedown?: boolean;

  @HostListener('mousedown', ['$event']) public onMouseDown(event: MouseEvent) {
    if(this.restrictMousedown) return;
    this.flowing = true;
    this.draw(event, true);
  }
  @throttle(OPTIONS.intervalMs / 2.5)
  @HostListener('mousemove', ['$event']) public onMove(event: MouseEvent) {
    this.draw(event);
    
  }
  @HostListener('mouseup', ['$event']) public onMouseUp(event: MouseEvent) {
    this.flowing = false;
    this.removeVibroDelay();
  }
  
  @HostListener('touchstart', ['$event']) public onTouchStart(event: TouchEvent) {
    this.flowing = true;
    this.draw(event, true);
  }
  @throttle(OPTIONS.intervalMs / 2.5)
  @HostListener('touchmove', ['$event']) public onTouchMove(event: TouchEvent) {
    this.draw(event);
    this.restrictMousedown = true;
  }
  @HostListener('touchend', ['$event']) public onTouchEnd(event: TouchEvent) {
    this.flowing = false;
    this.removeVibroDelay();
  }
  
  constructor(private renderer: Renderer2, private mobileDetectorService: MobileDetectorService) {
    this.initUpdates();
    this.mobileDetectorService.isMobile$?.subscribe(isMobile => this.restrictMousedown = isMobile)
  }

  @delay(300, RESET_DELAY)
  private doVibroImpulse() {
    navigator.vibrate(1);
  }

  removeVibroDelay() {
    RESET_DELAY.next(null);
  }

  private draw(event: TouchEvent | MouseEvent, onetimeDraw?: boolean) {
    if (!this.flowing) return;
    
    const [x, y] = this.getCoords(event);

    this.drawFlowing(x, y)
    if (onetimeDraw) return;
    this.doVibroImpulse();
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

  private getCoords(event: MouseEvent | TouchEvent) {
    let x: number, y: number;
    if(event instanceof MouseEvent) {
      x = event.clientX;
      y = event.clientY;
    } else {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    }

    return [x, y];
  }
}
