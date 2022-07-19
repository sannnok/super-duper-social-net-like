import { Directive, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';

@Directive({
  selector: '[appFlow]'
})
export class FlowDirective {
  flowing: boolean = false;

  // Todo: Perlin noise flying things
  @HostListener('mousedown', ['$event']) public onMouseDown(event: MouseEvent) {
    this.flowing = true;
    this.defineEventSource(event);
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
  }
  @HostListener('touchmove', ['$event']) public onTouchMove(event: TouchEvent) {
    if (!this.flowing) return;
    this.defineEventSource(event);
  }
  @HostListener('touchend', ['$event']) public onTouchEnd(event: TouchEvent) {
    this.flowing = false;
    
  }
  
  constructor(private renderer: Renderer2, private el: ElementRef) { }


  private drawFlowing(x: number, y: number) {
    console.log(x, y, this.el)
    const div = this.renderer.createElement('div')
    const text = this.renderer.createText('❤️')
    this.renderer.appendChild(div, text)
    this.renderer.appendChild(document.body, div)
    this.renderer.addClass(div, 'heart')
    this.renderer.setStyle(div, 'top', y + 'px')
    this.renderer.setStyle(div, 'left', x + 'px')
    this.renderer.setStyle(div, 'transform', `translate(-50%, -50%)`)
    // this.renderer.setStyle(div, 'transform', `translate3d(${x}px, ${y}px, 0px)`)

    console.log(`translate3d(${x}px, ${y}px, 0px)`)

    setTimeout(() => this.renderer.removeChild(document.body, div), 500)
    

    // this.renderer.setStyle(this.divHello, 'height', '10px')
    // this.renderer.setStyle(this.divHello, 'width', '10px')
    // this.renderer.setStyle(this.divHello, 'background', 'black')
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

    setTimeout(() => this.drawFlowing(x, y), 10)
  }
}
