import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category, Recipe, SearchQuery, User } from '../../../models/models';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchQueryService } from '../../../services/searchQuery.service';
import { UserService } from '../../../services/users.service';
import { RecipeService } from '../../../services/recipe.service';
import { Observable, Subject, of, from } from 'rxjs';
import { getDatabase, ref, get } from 'firebase/database';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  searchResults: Recipe[] = [];
  categories: Category[] = [];
  isLoading = false;
  errorMessage = '';
  recentsearches: string[] = [];
  user: User | null = null;
  recipes: Recipe[] = [];
  searchQueries: SearchQuery[] = [];

  // Subject to manage component subscriptions
  private destroy$ = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private searchService: SearchQueryService,
    private userService: UserService,
    private recipeService: RecipeService
  ) { }

  async ngOnInit() {
    try {
      // Fetch current user
      this.user = await this.userService.getCurrentUser();

      // Fetch categories
      this.categories = await this.categoryService.getThreeCategories();

      // Setup search functionality
      this.setupSearchObservable();

      // Optionally fetch recent search queries if user exists
      if (this.user) {
        this.searchQueries = await this.searchService.getSearchQueries(this.user.id_user);
      }

      // Fetch random recipes
      this.recipes = await this.recipeService.getRecipesLimited(5);
    } catch (error) {
      console.error('Initialization error:', error);
      this.errorMessage = 'Failed to load initial data';
    }
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchObservable() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        if (!searchTerm || searchTerm.length < 2) {
          return of([]);
        }
        this.isLoading = true;
        return this.searchRecipes(searchTerm).pipe(
          catchError(error => {
            console.error('Search error:', error);
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search subscription error:', error);
        this.isLoading = false;
        this.searchResults = [];
      }
    });
  }

  searchRecipes(searchTerm: string): Observable<Recipe[]> {
    const db = getDatabase();
    const recipesRef = ref(db, 'recipe_database/recipes');

    return from(get(recipesRef)).pipe(
      map((snapshot) => {
        const results: Recipe[] = [];

        snapshot.forEach((childSnapshot) => {
          const recipe = childSnapshot.val() as Recipe;

          // Multiple search criteria
          const matchesTitle = this.fuzzyMatch(recipe.title, searchTerm);
          const matchesCuisine = recipe.cuisine ? this.fuzzyMatch(recipe.cuisine, searchTerm) : false;

          if (matchesTitle || matchesCuisine) {
            results.push({
              ...recipe,
              id_recipe: childSnapshot.key || ''
            });
          }
        });

        // Sort results to show most relevant first
        results.sort((a, b) => {
          const scoreA = this.calculateRelevanceScore(a.title, searchTerm);
          const scoreB = this.calculateRelevanceScore(b.title, searchTerm);
          return scoreB - scoreA;
        });

        return results.slice(0, 10); // Limit to 10 results
      }),
      catchError((error) => {
        console.error('Detailed search error:', error);
        return of([]); // Return empty array on error
      })
    );
  }

  async selectRecipe(recipe: Recipe) {
    // Ensure user exists before adding search query
    if (!this.user) {
      console.warn('No user logged in');
      return;
    }

    this.searchControl.setValue(recipe.title);
    this.router.navigate(['/Landing/Recip', recipe.id_recipe]);

    // Update recent searches
    this.recentsearches = [
      recipe.title,
      ...this.recentsearches.filter(search => search !== recipe.title)
    ].slice(0, 5); // Limit to 5 recent searches

    // Add search query
    const searchQuery: SearchQuery = {
      user_id: this.user.id_user,
      searchQuery: recipe.title,
      created_at: new Date().toISOString()
    };

    try {
      await this.searchService.addSearchQuery(searchQuery);
    } catch (error) {
      console.error('Error adding search query:', error);
    }
  }

  navigateToCategory(categoryId: string) {
    this.router.navigate(['/category', categoryId]);
  }

  // Existing fuzzy match and relevance score methods remain the same
  private fuzzyMatch(source: string, search: string): boolean {
    if (!source || !search) return false;

    const sourceLower = source.toLowerCase();
    const searchLower = search.toLowerCase();

    const words = searchLower.split(' ');
    return words.every(word => sourceLower.includes(word));
  }

  private calculateRelevanceScore(title: string, searchTerm: string): number {
    if (!title || !searchTerm) return 0;

    const titleLower = title.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    // Exact match
    if (titleLower === searchLower) return 100;

    // Starts with
    if (titleLower.startsWith(searchLower)) return 50;

    // Contains
    if (titleLower.includes(searchLower)) return 25;

    // Partial word match
    const words = searchLower.split(' ');
    const wordMatchScore = words.reduce((score, word) => {
      return score + (titleLower.includes(word) ? 10 : 0);
    }, 0);

    return wordMatchScore;
  }
}