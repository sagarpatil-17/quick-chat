import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../../../dialogs/create-group/create-group.component';
import { GroupService } from '../../services/group.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  public myGroups: any;

  public section: string = 'chats';

  constructor(private matDialog: MatDialog, private _groupService: GroupService) { }

  ngOnInit() {
    this.getMyGroups();
  }

  private getMyGroups() {
    this._groupService.getMyGroups().subscribe(res => {
      this.myGroups = res;
    })
  }

  public switchSections(secName: string) {
    this.section = secName;
  }

  public openCreateGroupDialog() {
    this.matDialog.open(CreateGroupComponent, {
      width: '70%', data: { getMyGroups: () => this.getMyGroups() }
    })
  }
}
