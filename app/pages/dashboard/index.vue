<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()

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

async function deleteAccount () {
  if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    return
  }

  try {
    const cookie = useCookie('recipe_token')
    await $fetch(`${config.public.apiUrl}/api/users/profile`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookie.value}`
      }
    })

    alert('Votre compte a été supprimé.')
    await logout()
    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    alert('Une erreur est survenue lors de la suppression du compte.')
  }
}

if (error && error.value) {
  throw new Error('Impossible de charger vos recettes.')
}
</script>

<template>
  <div class="p-dashboard">
    <MTitle as="h1" size="large">Profil</MTitle>
    
    <div class="actions">
      <MButton type="button" @click="logout">Se déconnecter</MButton>
      <MButton type="button" variant="outline" @click="deleteAccount">
        Supprimer mon compte
      </MButton>
    </div>

    <MTitle as="h2" size="medium">Mes recettes :</MTitle>

    <div v-if="myRecipes" class="recipes-grid" >
      <div
        v-for="(recipe, index) in myRecipes"
        :key="index"
      >
        <MCards :recipe="recipe" size="small" />
      </div>
      <NuxtLink to="/add-recipe" >
        <MButton variant="outline" size="small" >Ajouter un recette</MButton>
      </NuxtLink>
    </div>

    <p v-else>Aucune recette trouvée.</p>
  </div>
</template>

<style scoped lang="scss">
  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    align-items: center;
  }

  .recipes-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    @media (min-width: $medium-breakpoint) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: $large-breakpoint) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
