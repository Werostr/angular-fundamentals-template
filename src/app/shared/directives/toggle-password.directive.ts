import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
})
export class TogglePasswordDirective {
  private visible: boolean = true;
  private icon: HTMLElement;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;
    this.icon = document.createElement("span");
    this.icon.innerHTML = "show";
    parent.appendChild(this.icon);
    this.icon.addEventListener("click", () => {
      this.toggle(this.icon);
    });
  }
  toggle(span: HTMLElement) {
    this.visible = !this.visible;
    if (this.visible) {
      this.el.nativeElement.setAttribute("type", "text");
      span.innerHTML = "hide";
    } else {
      this.el.nativeElement.setAttribute("type", "password");
      span.innerHTML = "show";
    }
  }
}
