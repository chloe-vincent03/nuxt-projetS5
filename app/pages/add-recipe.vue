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
const image_url = ref('')

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
  <div class="recipe-form">
    <MTitle as="h1" size="large">Ajouter une recette</MTitle>

    <form @submit.prevent="onSubmit">

      <!-- Infos de base -->
      <div class="recipe-form__group">
        <MLabbel v-model="title" size="large"  placeholder="Titre" required />
        <textarea v-model="description" placeholder="Description" required />
        <MLabbel v-model="image_url" size="large" placeholder="URL de l'image" />
      </div>

      <!-- Cuisine / Objectif / Régime / Allergènes -->
      <div class="recipe-form__group">
        <select v-model="cuisine_id" required>
          <option :value="null" disabled>Sélectionner une cuisine</option>
          <option v-for="cuisine in cuisines" :key="cuisine.cuisine_id" :value="cuisine.cuisine_id">{{ cuisine.name }}</option>
        </select>

        <select v-model="goal_id" required>
          <option :value="null" disabled>Sélectionner un objectif</option>
          <option v-for="goal in goals" :key="goal.goal_id" :value="goal.goal_id">{{ goal.name }}</option>
        </select>

        <select v-model="DietaryInformation_id">
          <option :value="null">Aucun régime particulier</option>
          <option v-for="diet in diets" :key="diet.diet_id" :value="diet.diet_id">{{ diet.name }}</option>
        </select>

        <select v-model="AllergiesInformation_id">
          <option :value="null">Aucun allergène</option>
          <option v-for="allergy in allergies" :key="allergy.allergy_id" :value="allergy.allergy_id">{{ allergy.name }}</option>
        </select>
      </div>

      <!-- Ingrédients -->
      <MTitle as="h2" size="medium">Ingrédients</MTitle>
      <div class="recipe-form__section">
        <div class="recipe-form__section-list">
          <div v-for="(ingredient, index) in ingredients" :key="index" class="recipe-form__section-item">
            <select v-model="ingredient.ingredient_id" required>
              <option :value="null" disabled>Sélectionner un ingrédient</option>
              <option v-for="i in availableIngredients" :key="i.ingredient_id" :value="i.ingredient_id">{{ i.name }} ({{ i.unit }})</option>
            </select>
            <input v-model.number="ingredient.quantity" type="number" placeholder="Quantité" required />
            <MButton size="tiny" variant="supp" @click="removeIngredient(index)">Supprimer</MButton>
          </div>
        </div>
        <MButton size="small" variant="outline" class="recipe-form__section-add" @click="addIngredient">Ajouter un ingrédient</MButton>
      </div>

      <!-- Étapes -->
      <MTitle as="h2" size="medium">Étapes</MTitle>
      <div class="recipe-form__section">
        <div class="recipe-form__section-list">
          <div v-for="(step, index) in instructions" :key="index" class="recipe-form__section-item">
            <textarea v-model="step.description" :placeholder="`Étape ${index + 1}`" required />
            <MButton size="tiny" variant="supp" @click="removeInstruction(index)">Supprimer</MButton>
          </div>
        </div>
        <MButton size="small" variant="outline" class="recipe-form__section-add" @click="addInstruction">Ajouter une étape</MButton>
      </div>

      <!-- Submit -->
      <div class="recipe-form__submit">
        <MButton type="submit">Créer la recette</MButton>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.recipe-form {
  max-width: rem(800);
  margin: 0 auto;
  padding: rem(32); 
  background: var(--color-text-w);
  border-radius: rem(16); 
  box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: rem(16);

  &__group {
    display: flex;
    flex-direction: column;
    gap: rem(8);

    select,
    textarea,
    input {
      padding: rem(12) rem(16); 
      font-size: rem(16);
      border: rem(1) solid var(--color-bg);
      border-radius: rem(8); 
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: var(--color-primary);
      }
    }

    textarea {
      resize: vertical;
      min-height: rem(80);
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: rem(16);

    &-list {
      display: flex;
      flex-direction: column;
      gap: rem(16);
    }

    &-item {
      display: flex;
      align-items: center;
      gap: rem(8);

      select,
      input[type="number"],
      textarea {
        flex: 1;
      }

      .m-button {
        flex-shrink: 0;
      }
    }

    &-add {
      align-self: flex-start;
      margin-top: rem(4);
    }
  }

  &__submit {
    display: flex;
    justify-content: center;
    margin-top: rem(32);

    .m-button {
      padding: rem(12) rem(32);
    }
  }
}

</style>

