import { Component, Input, OnInit } from '@angular/core';
import { Category, Favorite, Recipe, User } from '../../../models/models';
import { UserService } from '../../../services/users.service';
import { FavoriteService } from '../../../services/favourite.service';



@Component({
  selector: 'app-recips-card',
  templateUrl: './recips-card.component.html',
  styleUrl: './recips-card.component.css'
})
export class recipesCardComponent implements OnInit {


  constructor(private userService: UserService, private favouriteService: FavoriteService) {

  }

  @Input() recipe !: Recipe;
  @Input() categorieName?: string;
  user?: User | null;
  userId = 0;
  checkFavourite: boolean = false;

  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 500));


    try {
      this.user = await this.userService.getCurrentUser();
      if (this.user == null) {
        this.user = {
          id_user: "guest",
          fullname: "guest",
          email: "guest",
          password: "guest",
          subscribed: false
        };
      }

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  async addtofavorite() {
    if (this.user) {
      let favourite: Favorite = {
        id_recipe: this.recipe.id_recipe,
        id_user: this.user.id_user
      };
      await this.favouriteService.addFavorite(favourite);
      this.checkFavourite = await this.favouriteService.checkFavorite(this.recipe.id_recipe, this.user.id_user);
    } else {
      console.log("There is no user to add in Favourite ")
    }

  }






}
