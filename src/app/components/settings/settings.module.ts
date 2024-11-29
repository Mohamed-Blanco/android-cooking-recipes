import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterLink, RouterModule } from '@angular/router';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
