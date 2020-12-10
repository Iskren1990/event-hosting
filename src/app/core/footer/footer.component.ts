import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  public isBottom: Boolean = false; 
  // @HostListener("window:scroll",['$event.target'] ) onScroll(btn) {

  //   const d = document.documentElement;
  //   let offset = d.scrollTop + window.innerHeight;
  //   let height = d.offsetHeight;

  //   if (offset >= height) {
  //     this.isBottom = false;
  //   } else {
  //     this.isBottom = true;
  //   }
  // }
  constructor() { }

  ngOnInit(): void {
  }

}
