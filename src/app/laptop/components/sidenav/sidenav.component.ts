import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  public section: string = 'chats';

  constructor() { }

  public switchSections(secName: string) {
    this.section = secName;
  }
}
