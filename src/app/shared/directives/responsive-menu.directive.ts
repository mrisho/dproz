import { Directive, ElementRef, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[dprozResponsiveMenu]'
})
export class ResponsiveMenuDirective {

  constructor(private e: ElementRef, private r: Renderer2) { }

  @HostBinding('class') myColor;

  

  @HostListener("click") click()
  {
    
      this.r.addClass(this.e.nativeElement, "responsive");
  }



}
