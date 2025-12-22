<script setup lang="ts">
import type { User } from '~/types/api/user'
import type { Recipe } from '~/types/api/recipe'
import type { ApiResponse } from '~/types/api/response'

definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

// Récupération du profil utilisateur
const { data: user } = await useFetch<User>(`${config.public.apiUrl}/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${cookie.value}`
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (response: any) => response.data || response
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
  <div class="dashboard">
    <MTitle as="h1" size="large" class="dashboard__title">
      Profil
    </MTitle>

    <!-- Informations utilisateur -->
    <div v-if="user" class="dashboard__user">
      <p class="dashboard__user-info">
        <strong>Nom d'utilisateur :</strong> {{ user.username }}
      </p>
      <p class="dashboard__user-info">
        <strong>Email :</strong> {{ user.email }}
      </p>
      <p
        v-if="user.first_name || user.last_name"
        class="dashboard__user-info"
      >
        <strong>Nom complet :</strong> {{ user.first_name }} {{ user.last_name }}
      </p>
    </div>

    <!-- Actions utilisateur -->
    <div class="dashboard__actions">
      <MButton size="default" @click="logout">
        Se déconnecter
      </MButton>

      <MButton
        variant="supp"
        size="default"
        @click="deleteAccount"
      >
        Supprimer mon compte
      </MButton>

      <NuxtLink to="/dashboard/edit" class="dashboard__edit-link">
        <p>Modifier mon profil</p>
      </NuxtLink>
    </div>

    <MTitle as="h2" size="medium" class="dashboard__subtitle">
      Mes recettes :
    </MTitle>

    <!-- Liste des recettes -->
    <div v-if="myRecipes" class="dashboard__recipes">
      <div
        v-for="(recipe, index) in myRecipes"
        :key="index"
        class="dashboard__recipe"
      >
        <MCards :recipe="recipe" size="small" />
      </div>

      <NuxtLink to="/add-recipe" class="dashboard__add-recipe">
        <MButton variant="outline" size="small">
          Ajouter une recette
        </MButton>
      </NuxtLink>
    </div>

    <p v-else class="dashboard__empty">
      Aucune recette trouvée.
    </p>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  &__title {
    margin-bottom: 1.5rem;
  }

  &__user {
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &__user-info {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__edit-link {
    text-decoration: none;
  }

  &__subtitle {
    margin-bottom: 1rem;
  }

  &__recipes {
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

  &__recipe {
    display: flex;
  }

  &__add-recipe {
    margin-top: 1rem;
  }
}
</style>
