<script lang="ts" setup>
import type { FullRecipe } from '~/types/api/recipe'
import type { ApiResponse } from '~/types/api/response'

const config = useRuntimeConfig()
const route = useRoute()
const cookie = useCookie('recipe_token')

/* =========================
   Fetch Existing Recipe
   ========================= */
const { data: recipe } = await useFetch(`${config.public.apiUrl}/api/recipes/${route.params.id}`, {
  transform: (response: ApiResponse<FullRecipe>) => response.data
})

if (!recipe.value) {
  throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
}

/* =========================
   Submit
   ========================= */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleUpdate (payload: any) {
  try {
    const res = await fetch(`${config.public.apiUrl}/api/recipes/${route.params.id}/full`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookie.value}`
      },
      body: JSON.stringify(payload)
    })

    const json = await res.json()
    if (json.success) {
      alert('Recette mise à jour avec succès !')
      await navigateTo(`/recipe/${route.params.id}`)
    } else {
      alert(json.message || 'Erreur lors de la mise à jour')
    }
  } catch (e) {
    //eslint-disable-next-line no-console
    console.error(e)
    alert('Erreur réseau')
  }
}
</script>

<template>
  <RecipeForm
    v-if="recipe"
    :initial-data="recipe"
    :is-edit-mode="true"
    @submit="handleUpdate"
    @cancel="navigateTo(`/recipe/${route.params.id}`)"
  />
</template>
