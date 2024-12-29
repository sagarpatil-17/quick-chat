import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../../../dialogs/create-group/create-group.component';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Subject, filter, takeUntil } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import { RequestComponent } from '../request/request.component';
import { Loader2Component } from '../../../common/components/loader2/loader2.component';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, Loader2Component, RequestComponent, SearchComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  public myGroups: any;
  public friendList: any;
  public id: any;
  public isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  public section: string = 'chats';

  constructor(private matDialog: MatDialog, private _groupService: GroupService, private actRoute: ActivatedRoute, public _sharedService: SharedService, private _userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getFriendList();
    this.updateRouteInfo();
  }

  private updateRouteInfo() {
    setTimeout(() => {
      this.id = this.router?.url?.split('/')?.pop();

      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          this.id = this.router?.url?.split('/')?.pop();
        });
    }, 1000);
  }

  private getFriendList() {
    this._userService.getFriendList().subscribe(res => {
      this.friendList = res;
    })
  }

  private getMyGroups() {
    this._groupService.getMyGroups().subscribe(res => {
      this.myGroups = res;
    })
  }

  public switchSections(secName: string) {
    this.section = secName;

    if (secName == 'groups') {
      this.getMyGroups();
    } else if (secName == 'profile') {
      this.patchProfileForm();
    }
  }

  public openCreateGroupDialog() {
    this.matDialog.open(CreateGroupComponent, {
      width: '70%', data: { getMyGroups: () => this.getMyGroups() }
    })
  }

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    about: new FormControl(''),
    password: new FormControl(''),
  })

  private patchProfileForm() {
    this.profileForm.patchValue({
      username: this._sharedService?.userInfo?.username,
      email: this._sharedService?.userInfo?.email,
      about: this._sharedService?.userInfo?.about,
    })
  }

  public updateUser() {
    const profileForm = this.profileForm.value;
    const formData = {
      username: profileForm.username,
      email: profileForm.email,
      // password: profileForm.password,
      about: profileForm.about,
    }

    this.isLoading = true;
    this._userService.updateUser(this._sharedService?.userInfo?.id, formData).subscribe(res => {
      localStorage.setItem('user_info', JSON.stringify(res));
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    })
  }

  public onLogout() {
    Swal.fire({
      icon: 'warning',
      title: "Do you want to Signout?",
      showCancelButton: true,
      confirmButtonText: "Yes, I do",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Saved!", "", "success");
        this.router.navigate(['/sign-in']);
        localStorage.clear();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
