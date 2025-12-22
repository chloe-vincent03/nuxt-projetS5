import type { Cuisine } from '~/types/api/cuisine'

export type Recipe = {
  recipe_id: number
  title: string
  description: string
  image_url: string | null

  cuisine_name: Cuisine['name'] | null
  goal_name: string | null
  diet_name: string | null
  allergy_name: string | null
  user_id: number
}

export type RecipeInstructions = {
  instruction_id: number
  step_number: number
  description: string
}

export type RecipeIngredients = {
  ingredient_id: number
  name: string
  unit: string
  quantity: number
}

export type FullRecipe = Recipe & {
  cuisine_id: Cuisine['cuisine_id'] | null
  goal_id: number | null
  DietaryInformation_id: number | null
  AllergiesInformation_id: number | null

  ingredients: RecipeIngredients[]
  instructions: RecipeInstructions[]
}

