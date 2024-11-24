import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { NavigationBarModule } from '../navigation-bar/navigation-bar.module';
import { TopBarModule } from '../top-bar/top-bar.module';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavigationBarModule,
    TopBarModule
  ], exports: [LandingPageComponent]
})
export class LandingPageModule { }
