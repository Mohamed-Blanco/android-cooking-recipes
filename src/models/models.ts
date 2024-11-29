export interface User {
    id_user: string;
    fullname: string;
    email: string;
    password: string;
    subscribed: boolean;
    created_at?: string;
}

export interface Recipe {
    id_recipe: string;
    title: string;
    image_url?: string;
    weight?: number;
    time?: number;
    timeToResults?: number;
    preparation_time?: string;
    region?: string;
    cuisine?: string;
    id_categorie: number;
    created_at?: string;
    leveldefficultie: string;
    description: string;
    burningtime: number;
    repostime: number;
}

export interface Stage {
    id_stage?: string;
    id_recipe: number;
    description: string;
    order_num: number;
    created_at?: string;
}

export interface Material {
    id_material?: string;
    title_material: string;
    created_at?: string;
    id_recipe: string;


}



export interface Ingredient {

    id_ingredient?: string;
    id_categorie: number;
    name_ingredient: string;
    weight?: number;
    created_at?: string;
    id_recipe: string;

}

export interface RecipeIngredient {
    id_recipe: number;
    id_ingredient: number;
    quantity: number;
    unit: string;
    created_at?: string;
}

export interface Category {
    id_categorie: string;
    name: string;
    description?: string;
    created_at?: string;
    imageurl?: string;
}

export interface Favorite {

    id_recipe: string;
    id_user: string;
    created_at?: string;
}

export interface SearchQuery {
    id_search?: string;
    user_id: string;
    searchQuery: string;
    created_at?: string;
}

// Optional: Add joined interfaces for common queries
export interface RecipeWithDetails extends Recipe {
    category?: Category;
    stages?: Stage[];
    materials?: (Material & { quantity?: number })[];
    ingredients?: (Ingredient & { quantity: number; unit: string })[];
}

export interface UserWithFavorites extends User {
    favorites?: (Recipe & { created_at: string })[];
}