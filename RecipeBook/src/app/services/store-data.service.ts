import { Injectable, } from '@angular/core';
import { RecipeService } from './recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StoreDataService {

	private url : string = 'https://ng-recipe-book-ee833.firebaseio.com/';
	private recipesPath : string = 'recipes.json';

	constructor(private httpClient: HttpClient,
				private recipeService: RecipeService) { }
	
	saveRecipes() {
		// this.httpClient.put(this.url + this.recipesPath, this.recipeService.getRecipes(),
		// {
		// 	observe: 'body',
		// 	params: new HttpParams().set('auth', token)
		// })
		// .subscribe((response) => {
		// 	console.log(response);			
		// });

		const request = new HttpRequest('PUT', this.url + this.recipesPath, this.recipeService.getRecipes(), {reportProgress: true});
		
		this.httpClient.request(request)
		.subscribe((response) => {
			console.log(response);			
		});
	}

	loadRecipes() {
		// this.httpClient.get<Recipe[]>(this.url + this.recipesPath + token).pipe(
		this.httpClient.get<Recipe[]>(this.url + this.recipesPath,
		{
			observe: 'body',
			responseType: 'json'
		}).pipe(
		map((recipes) => {
			console.log(recipes);
			recipes.forEach((recipe: Recipe) => {
				console.log(recipe);
				if(recipe.ingredients === undefined) {
					recipe.ingredients = [];
				}
			});
			return recipes;
		})).subscribe(
		(recipes: Recipe[]) => {
			this.recipeService.setRecipes(recipes);
		} 
		);
	}
}
