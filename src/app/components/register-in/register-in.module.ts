import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterInComponent } from './register-in.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';



@NgModule({
  declarations: [RegisterInComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, LoadingModule
  ], exports: [
    RegisterInComponent
  ]
})
export class RegisterInModule { }
