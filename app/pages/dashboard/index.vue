<script setup lang="ts">
import type { User } from '~/types/api/user'
definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

// Récupération du profil utilisateur
const { data: user } = await useFetch<User>(`${config.public.apiUrl}/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${cookie.value}`
  }
  ,
  transform: (response: User) => {
    return response.data || response
  }
})

// Récupération des recettes de l'utilisateur connecté
const { data: myRecipes, error } = await useAsyncData('my-recipes', async () => {
  return await $fetch<ApiResponse<Recipe[]>>(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  }).then(res => res.data)
})

async function logout () {
  cookie.value = null
  navigateTo('/login')
}

async function deleteAccount () {
  if (!confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    return
  }

  try {
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
    
    <!-- Affichage des infos utilisateur -->
    <div v-if="user" class="user-info">
      <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p v-if="user.first_name || user.last_name">
        <strong>Nom complet :</strong> {{ user.first_name }} {{ user.last_name }}
      </p>
    </div>

    <div class="actions">
      <MButton size="default" @click="logout">Se déconnecter</MButton>
      <MButton variant="outline" size="default" @click="deleteAccount">
        Supprimer mon compte
      </MButton>
      <NuxtLink to="/dashboard/edit">
        <p variant="outline" size="small" >Modifier mon profil</p>
      </NuxtLink>
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

  .user-info {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    
    p {
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
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
