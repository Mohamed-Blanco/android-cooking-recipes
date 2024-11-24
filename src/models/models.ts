export interface User {
    id_user?: number;
    fullname: string;
    email: string;
    password: string;
    subscribed: boolean;
    created_at?: string;
}

export interface Recipe {
    id_recipe?: number;
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
}

export interface Stage {
    id_stage?: number;
    id_recipe: number;
    description: string;
    order_num: number;
    created_at?: string;
}

export interface Material {
    id_material?: number;
    title_material: string;
    created_at?: string;
}

export interface RecipeMaterial {
    id_recipe: number;
    id_material: number;
    quantity?: number;
    created_at?: string;
}

export interface Ingredient {
    id_ingredient?: number;
    id_categorie: number;
    name_ingredient: string;
    weight?: number;
    created_at?: string;
}

export interface RecipeIngredient {
    id_recipe: number;
    id_ingredient: number;
    quantity: number;
    unit: string;
    created_at?: string;
}

export interface Category {
    id_categorie?: number;
    name: string;
    description?: string;
    created_at?: string;
}

export interface Favorite {
    id_recipe: number;
    id_user: number;
    created_at?: string;
}

export interface SearchQuery {
    id_search?: number;
    user_id: number;
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