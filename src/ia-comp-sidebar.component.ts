import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ia-comp-sidebar',
  templateUrl: './ia-comp-sidebar.component.html',
  styleUrls: ['./ia-comp-sidebar.component.scss']
})
export class IaCompSidebarComponent implements OnInit {

  @Input() generalData: string;
  @Input() itemsData: string;

  private opened: boolean; // Variable that changes when menu is opened(true) or not(false)
  private image;

  constructor() {
    // Set menu opened default to false
    this.opened = false;
    this.image = require('./../img/zemsania_cut.png');
  }

  // Toggle opened value
  openMenu() {
    this.opened = !this.opened;
  }
  // Equal opened to false
  openFalse() {
    this.opened = false;
  }

  // Check if there is a window resize. When it is wider than media query $tablet(768px) turn opened to false
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const windowSize: number = event.target.innerWidth;
    if (windowSize > 768) {
      this.opened = false;
    }
  }

  ngOnInit() {
  }

}
