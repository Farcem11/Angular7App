import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHightlight]'
})
export class BetterHightlightDirective implements OnInit{

  @Input() defaultColor : string = 'transparent';
  @Input() hightlightColor : string = 'blue';

  @HostBinding('style.backgroundColor') backgroundColor : string;

  constructor(private elemenetRef : ElementRef, private renderer : Renderer2) { }

  ngOnInit(): void {
    // this.renderer.setStyle(this.elemenetRef.nativeElement, 'backgroundColor', 'blue');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseEnter() {
    // this.renderer.setStyle(this.elemenetRef.nativeElement, 'backgroundColor', 'blue');
    this.backgroundColor = this.hightlightColor;
  } 

  @HostListener('mouseleave') mouseLeave() {
    // this.renderer.setStyle(this.elemenetRef.nativeElement, 'backgroundColor', 'transparent');
    this.backgroundColor = this.defaultColor;
  } 
}
