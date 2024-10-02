import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  public visible: boolean = false;

  constructor(private el: ElementRef) {}

  public toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.el.nativeElement.setAttribute("type", "text");
    } else {
      this.el.nativeElement.setAttribute("type", "password");
    }
  }
}
