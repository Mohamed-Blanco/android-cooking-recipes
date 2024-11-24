import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { UserService } from '../../../services/users.service';
import { Category, User } from '../../../models/models';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  categories !: Category[];
  newCategory: Omit<Category, 'id' | 'created_at'> = {
    name: '',
    description: '',
  };

  constructor(private userService: UserService, private categoryService: CategoryService) { }


  async ngOnInit() {
    await
      await this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  async addCategory() {
    console.log("hello", this.newCategory.name + this.newCategory.description)

    if (this.newCategory.name && this.newCategory.description) {
      await this.categoryService.addCategory(this.newCategory);
      this.newCategory = {
        name: '',
        description: ''
      }
      this.loadCategories()
    }
  }


  async deleteCategory(id: number) {
    await this.categoryService.deleteCategory(id);
    await this.loadCategories();
  }

  async updateCategory(id: number, data: Partial<Category>) {
    await this.categoryService.updateCategory(id, data)
    await this.loadCategories();
  }




} 
