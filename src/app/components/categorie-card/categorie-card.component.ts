import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../models/models';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrl: './categorie-card.component.css'
})
export class CategorieCardComponent implements OnInit {


  @Input() categorie !: Category;

  ngOnInit(): void {
  }



}
