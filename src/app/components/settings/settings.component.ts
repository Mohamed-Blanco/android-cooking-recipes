import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/models';
import { FavoriteService } from '../../../services/favourite.service';
import { RecipeService } from '../../../services/recipe.service';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  authenticated: boolean = false;

  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      //this.user = await this.userService.currentUser;
      if (this.user.fullname != "guest") {
        this.authenticated = true
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  user !: User;

  constructor(private userService: UserService) {

  }


}
