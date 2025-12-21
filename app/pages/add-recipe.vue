<script lang="ts" setup>
/* import type { Cuisine } from '~/types/api/cuisine'
import type { Goal } from '~/types/api/goal'
import type { Diet } from '~/types/api/diet'
import type { Allergy } from '~/types/api/allergy' */

/* =========================
   Champs recette
========================= */
const title = ref('')
const description = ref('')
const image_url = ref<string | null>(null)

const cuisine_id = ref<number | null>(null)
const goal_id = ref<number | null>(null)
const DietaryInformation_id = ref<number | null>(null)
const AllergiesInformation_id = ref<number | null>(null)

const goals = ref<Goal[]>([])
const diets = ref<Diet[]>([])
const allergies = ref<Allergy[]>([])


/* =========================
   Ingrédients & étapes
========================= */
type IngredientForm = {
  ingredient_id: number | null
  quantity: number | null
}

type InstructionForm = {
  description: string
}

const ingredients = ref<IngredientForm[]>([
  { ingredient_id: null, quantity: null }
])

const instructions = ref<InstructionForm[]>([
  { description: '' }
])

/* =========================
   Données externes
========================= */
const cuisines = ref<Cuisine[]>([])
const availableIngredients = ref<{ ingredient_id: number; name: string; unit: string }[]>([])

const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

/* =========================
   Fetch données externes
========================= */
async function fetchCuisines () {
  const res = await fetch(`${config.public.apiUrl}/api/cuisines`)
  const json = await res.json()
  if (json.success) cuisines.value = json.data
}
async function fetchGoals () {
  const res = await fetch(`${config.public.apiUrl}/api/goals`)
  const json = await res.json()
  if (json.success) goals.value = json.data
}

async function fetchDiets () {
  const res = await fetch(`${config.public.apiUrl}/api/diet`)
  const json = await res.json()
  if (json.success) diets.value = json.data
}

async function fetchAllergies () {
  const res = await fetch(`${config.public.apiUrl}/api/allergie`)
  const json = await res.json()
  if (json.success) allergies.value = json.data
}


/* =========================
   Fetch ingrédients
========================= */
async function fetchIngredients () {
  const res = await fetch(`${config.public.apiUrl}/api/ingredients`)
  const json = await res.json()
  if (json.success) availableIngredients.value = json.data
}

onMounted(() => {
  fetchCuisines()
  fetchGoals()
  fetchDiets()
  fetchAllergies()
  fetchIngredients()
})

/* =========================
   Gestion dynamique
========================= */
function addIngredient () {
  ingredients.value.push({ ingredient_id: null, quantity: null })
}

function removeIngredient (index: number) {
  ingredients.value.splice(index, 1)
}

function addInstruction () {
  instructions.value.push({ description: '' })
}

function removeInstruction (index: number) {
  instructions.value.splice(index, 1)
}

/* =========================
   Submit
========================= */
async function onSubmit () {
  if (!cuisine_id.value || !goal_id.value) return

  const payload = {
    title: title.value,
    description: description.value,
    image_url: image_url.value,

    cuisine_id: cuisine_id.value,
    goal_id: goal_id.value,
    DietaryInformation_id: DietaryInformation_id.value,
    AllergiesInformation_id: AllergiesInformation_id.value,

    ingredients: ingredients.value.map(i => ({
      ingredient_id: i.ingredient_id!,
      quantity: i.quantity!
    })),

    instructions: instructions.value.map((step, index) => ({
      step_number: index + 1,
      description: step.description
    }))
  }

  const res = await fetch(`${config.public.apiUrl}/api/recipes/full`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie.value}`
    },
    body: JSON.stringify(payload)
  })

  const json = await res.json()
  if (json.success) await navigateTo('/dashboard')
}
</script>

<template>
  <div>
    <h1>Ajouter une recette</h1>

    <form @submit.prevent="onSubmit">

      <!-- Infos de base -->
      <input v-model="title" placeholder="Titre" required />
      <textarea v-model="description" placeholder="Description" required />
      <input v-model="image_url" placeholder="URL de l'image" />

      <!-- Cuisine -->
      <select v-model="cuisine_id" required>
        <option :value="null" disabled>Sélectionner une cuisine</option>
        <option
          v-for="cuisine in cuisines"
          :key="cuisine.cuisine_id"
          :value="cuisine.cuisine_id"
        >
          {{ cuisine.name }}
        </option>
      </select>

      <!-- Objectif -->
      <select v-model="goal_id" required>
        <option :value="null" disabled>Sélectionner un objectif</option>
        <option
          v-for="goal in goals"
          :key="goal.goal_id"
          :value="goal.goal_id"
        >
          {{ goal.name }}
        </option>
      </select>

      <!-- Régime -->
      <select v-model="DietaryInformation_id">
        <option :value="null">Aucun régime particulier</option>
        <option
          v-for="diet in diets"
          :key="diet.diet_id"
          :value="diet.diet_id"
        >
          {{ diet.name }}
        </option>
      </select>

      <!-- Allergènes -->
      <select v-model="AllergiesInformation_id">
        <option :value="null">Aucun allergène</option>
        <option
          v-for="allergy in allergies"
          :key="allergy.allergy_id"
          :value="allergy.allergy_id"
        >
          {{ allergy.name }}
        </option>
      </select>


      <!-- =========================
           Ingrédients
      ========================== -->
      <h2>Ingrédients</h2>

      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
      >
        <select v-model="ingredient.ingredient_id" required>
          <option :value="null" disabled>Sélectionner un ingrédient</option>
          <option
            v-for="i in availableIngredients"
            :key="i.ingredient_id"
            :value="i.ingredient_id"
          >
            {{ i.name }} ({{ i.unit }})
          </option>
        </select>

        <input
          v-model.number="ingredient.quantity"
          type="number"
          placeholder="Quantité"
          required
        >

        <button type="button" @click="removeIngredient(index)">❌</button>
      </div>

      <button type="button" @click="addIngredient">➕ Ajouter un ingrédient</button>

      <!-- =========================
           Étapes
      ========================== -->
      <h2>Étapes</h2>

      <div
        v-for="(step, index) in instructions"
        :key="index"
      >
        <textarea
          v-model="step.description"
          :placeholder="`Étape ${index + 1}`"
          required
        />

        <button type="button" @click="removeInstruction(index)">❌</button>
      </div>

      <button type="button" @click="addInstruction">➕ Ajouter une étape</button>

      <MButton type="submit">
        Créer la recette
      </MButton>

    </form>
  </div>
</template>
