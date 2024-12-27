import { Component, Inject } from '@angular/core';
import { MatModule } from '../../material/mat.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../shared/services/dialog.service';
import { LoaderComponent } from '../../common/components/loader/loader.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-group',
  imports: [CommonModule, MatModule, LoaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {
  public isLoading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CreateGroupComponent>, private _dialogService: DialogService) {
   }

  groupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  })

  public createGroup() {
    const groupForm = this.groupForm.value
    const formData = {
      name: groupForm.name,
      description: groupForm.description
    };

    if (this.groupForm.valid) {
      this.isLoading = true;
      this._dialogService.createGroup(formData).subscribe(() => {
        this.isLoading = false;
        this.data.getMyGroups();
          this.dialogRef.close();
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Group created successfully!'
        // }).then(() => {
        //   this.dialogRef.close();
        // })
      }, () => {
        this.isLoading = false;
      })
    } else {
      Swal.fire({
        icon: 'info',
        text: 'Please enter a group name'
      })
    }

  }

}
