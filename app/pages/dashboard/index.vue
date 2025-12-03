<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()

// Récupération des recettes de l'utilisateur connecté
const { data: myRecipes, error } = await useAsyncData('my-recipes', async () => {
  const cookie = useCookie('recipe_token')
  return await $fetch<ApiResponse<Recipe[]>>(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  }).then(res => res.data)
})

async function logout () {
  const cookie = useCookie('recipe_token')
  cookie.value = null
  navigateTo('/login')
}

if (error && error.value) {
  throw new Error('Impossible de charger vos recettes.')
}
</script>

<template>
  <div class="p-dashboard">
    <h1>Dashboard</h1>
    <MButton type="button" @click="logout">Se déconnecter</MButton>

    <h2 class="mt-6">Mes recettes :</h2>

    <div v-if="myRecipes" class="recipes-grid" >
      <div
        v-for="(recipe, index) in myRecipes"
        :key="index"
      >
        <MCards :recipe="recipe" size="small" />
      </div>
    </div>

    <p v-else>Aucune recette trouvée.</p>
  </div>
</template>
