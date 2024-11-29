import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { Router } from '@angular/router';
import { Category } from '../../../models/models';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }


  categories !: Category[];
  loading: boolean = true;

  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      this.categories = await this.categoryService.getCategories();
      console.log('Categories:', this.categories);
      this.loading = false;

    } catch (error) {
      console.error('Error fetching categories:', error);
    }


  }

}
