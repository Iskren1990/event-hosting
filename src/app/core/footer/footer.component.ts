import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  public isBottom: Boolean = true; 
  @HostListener("window:mousemove",['$event.target'] ) onScroll(btn) {
    const d = document.documentElement;
    this.isBottom = (d.scrollHeight - d.scrollTop) === d.offsetHeight;
  }
}
