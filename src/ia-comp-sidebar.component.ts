import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ia-comp-sidebar',
  templateUrl: './ia-comp-sidebar.component.html',
  styleUrls: ['./ia-comp-sidebar.component.scss']
})
export class IaCompSidebarComponent implements OnInit {

  // Ready to receive info from its parent via Input
    // Sidebar Head data
    @Input() sidebarHead: any;
    // Sidebar Navigation List data
    @Input() dataCompSidebar: any;

  // Variable that changes when menu is opened(true) or not(false)
  opened: boolean;
    image;

  constructor(){
    // Set menu opened default to false
    this.opened = false;
    this.image = require('../img/zemsania_cut.png');
  }

  // Toggle opened value
  openMenu(){
    this.opened = !this.opened;
  }
  // Equal opened to false
  openFalse(){
    this.opened = false;
  }

  // Check if there is a window resize. When it is wider than media query $tablet(768px) turn opened to false
  @HostListener('window:resize', ['$event'])
  onResize(event){
    let windowSize: number = event.target.innerWidth;
    if (windowSize > 768)
      this.opened = false;
  }

  ngOnInit() {
  }

}
