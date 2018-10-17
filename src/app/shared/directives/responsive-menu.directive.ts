import { Directive, ElementRef, Renderer2, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dprozResponsiveMenu]'
})
export class ResponsiveMenuDirective {

  @Input() inStatus:boolean
  @Output() outStatus:EventEmitter<boolean> = new EventEmitter();

  constructor(private e: ElementRef, private r: Renderer2) { 

    
  }

  

  @HostListener("click") click()
  {
      if(this.inStatus){
        this.r.removeClass(this.e.nativeElement, "responsive");
        this.outStatus.emit(false);
      } else {
        this.r.addClass(this.e.nativeElement, "responsive");
        this.outStatus.emit(true);
      }
     

     
  }



}
