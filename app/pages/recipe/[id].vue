<script lang="ts" setup >
import type { FullRecipe } from '~/types/api/recipe'
import type { User } from '~/types/api/user'
import type { ApiResponse } from '~/types/api/response'
const route = useRoute()
const config = useRuntimeConfig()
const cookie = useCookie('recipe_token') 

// >>> Récupération de la recette
const { data: recipe, error } = await useAsyncData(`recipe-${route.params.id}`, async () => {
  const { data } = await $fetch<ApiResponse<FullRecipe>>(
    `${config.public.apiUrl}/api/recipes/${route.params.id}`
  )
  return data
})

const { data: user } = await useFetch<User>(`${config.public.apiUrl}/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${cookie.value}`
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (response: any) => response.data || response
})

if (!recipe.value || error.value) throw new Error('Recipe not found')

useHead({
  title: recipe.value.title,
  meta: [
    { name: 'description', content: recipe.value.description }
  ]
})


// >>> Fonction DELETE simplifiée
async function deleteRecipe () {
  if (!confirm('Es-tu sûr de vouloir supprimer cette recette ?')) return

  try {
    const response = await fetch(`${config.public.apiUrl}/api/recipes/${recipe.value?.recipe_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookie.value}`
      }
    })

    const json = await response.json()
    if (!json.success) {
      alert(json.message)
      return
    }

    // Redirection après suppression
    await navigateTo('/dashboard')

  } catch (err) {
    //eslint-disable-next-line no-console
    console.error('Erreur suppression recette:', err)
  }
}

</script>

<template>
  <div v-if="recipe" class="recipe">
    <MTitle as="h1" size="large" class="recipe__title">
      {{ recipe.title }}
    </MTitle>

    <p class="recipe__description">
      {{ recipe.description }}
    </p>

    <div class="recipe__image-wrapper">
      <NuxtImg
        :src="`/recipes/` + recipe.image_url"
        width="1200"
        height="800"
        class="recipe__image"
      />
    </div>

    <div class="recipe__content">
      <!-- Texte principal -->
      <div class="recipe__text">
        <p v-if="recipe.cuisine_name">
          <strong>Cuisine :</strong> {{ recipe.cuisine_name }}
        </p>
        <p v-if="recipe.goal_name">
          <strong>Objectif :</strong> {{ recipe.goal_name }}
        </p>
        <p v-if="recipe.diet_name">
          <strong>Régime :</strong> {{ recipe.diet_name }}
        </p>
        <p v-if="recipe.allergy_name">
          <strong>Allergènes :</strong> {{ recipe.allergy_name }}
        </p>

        <MTitle as="h2" size="small" class="recipe__subtitle">
          Instructions
        </MTitle>

        <ul class="recipe__instructions">
          <li
            v-for="(instruction, index) in recipe.instructions"
            :key="index"
            class="recipe__instruction"
          >
            <strong>{{ instruction.step_number }}.</strong>
            {{ instruction.description }}
          </li>
        </ul>
      </div>

      <!-- Ingrédients -->
      <aside class="recipe__ingredients">
        <MTitle as="h2" size="small" class="recipe__subtitle">
          Ingrédients
        </MTitle>

        <ul class="recipe__ingredients-list">
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
            class="recipe__ingredient"
          >
            {{ ingredient.quantity }} {{ ingredient.unit }} de {{ ingredient.name }}
          </li>
        </ul>
      </aside>
    </div>

    <!-- Actions -->
    <div class="recipe__actions">
      <NuxtLink
        v-if="user && user.user_id === recipe.user_id"
        :to="`/recipe/edit/${recipe.recipe_id}`"
      >
        <MButton variant="outline">
          Modifier la recette
        </MButton>
      </NuxtLink>

      <MButton
        v-if="user && user.user_id === recipe.user_id"
        variant="supp"
        @click="deleteRecipe"
      >
        Supprimer la recette
      </MButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.recipe {
  max-width: 1300px;
  margin: auto;
  padding: rem(10);
  font-family: "Inter", sans-serif;

  &__title {
    text-align: center;
    margin-bottom: rem(10);
  }

  &__description {
    text-align: center;
    font-size: rem(21);
    margin-bottom: rem(30);
  }

  &__image-wrapper {
    width: 100%;
    border-radius: rem(14);
    overflow: hidden;
    margin-bottom: rem(35);
  }

  &__image {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  &__content {
    display: flex;
    gap: rem(30);
  }

  &__text {
    flex: 2;

    p {
      margin-bottom: rem(6);
    }
  }

  &__subtitle {
    margin-top: rem(25);
    margin-bottom: rem(10);
  }

  &__instructions {
    padding: 0;
  }

  &__instruction {
    list-style: none;
    margin-bottom: rem(8);
  }

  &__ingredients {
    flex: 1;
    background: var(--color-bg);
    padding: rem(20);
    border-radius: rem(12);
    border: rem(1) solid var(--color-secondary);
  }

  &__ingredients-list {
    padding-left: rem(10);
  }

  &__ingredient {
    margin: rem(6) 0;
    line-height: 1.4;
  }

  &__actions {
    display: flex;
    gap: rem(12);
    margin-top: rem(30);
  }
}
</style>
