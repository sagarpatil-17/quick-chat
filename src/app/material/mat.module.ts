import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

const modules = [MatDialogModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, modules
  ],
  exports: [modules]
})
export class MatModule { }
