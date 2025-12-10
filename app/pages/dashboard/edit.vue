<script setup lang="ts">
import type { User } from '~/types/api/user'

definePageMeta({
  middleware: ['auth']
})

const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

const form = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: ''
})

const { data: user, error } = await useFetch<User>(`${config.public.apiUrl}/api/users/profile`, {
  headers: {
    Authorization: `Bearer ${cookie.value}`
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (response: any) => response.data || response
})

if (error.value) {
  // eslint-disable-next-line no-console
  console.error('Erreur chargement profil', error.value)
}

watch(user, (newUser) => {
  if (newUser) {
    form.value.username = newUser.username || ''
    form.value.email = newUser.email || ''
    form.value.first_name = newUser.first_name || ''
    form.value.last_name = newUser.last_name || ''
  }
}, { immediate: true })

async function onSubmit () {
  try {
    await $fetch(`${config.public.apiUrl}/api/users/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookie.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    alert('Profil mis à jour avec succès !')
    await navigateTo('/dashboard')
    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    alert('Erreur lors de la mise à jour du profil.')
  }
}
</script>

<template>
  <div class="p-edit-profile">
    <MTitle as="h1" size="large">Modifier mon profil</MTitle>
    
    <form class="p-edit-profile__form" @submit.prevent="onSubmit">
      
      <div>
        <label for="username">Nom d'utilisateur</label>
        <MLabbel v-model="form.username" for="username" type="text" size="default" placeholder="Nom d'utilisateur" />
      </div>

      <div>
        <label for="email">Email</label>
        <MLabbel v-model="form.email" for="email" type="email" size="default" placeholder="Email" />
      </div>

      <div>
        <label for="first_name">Prénom</label>
        <MLabbel v-model="form.first_name" for="first_name" type="text" size="default" placeholder="Prénom" />
      </div>

      <div>
        <label for="last_name">Nom</label>
        <MLabbel v-model="form.last_name" for="last_name"  type="text" size="default" placeholder="Nom" />
      </div>

      <div>
        <MButton type="submit">Enregistrer</MButton>

        <NuxtLink to="/dashboard">
          <MButton variant="outline" type="button">Annuler</MButton>
        </NuxtLink>
      </div>

    </form>
  </div>
</template>


<style scoped lang="scss">
.p-edit-profile {
  max-width: rem(600);
  margin: 0 auto;
  color: var(--color-b);

  &__form {
    display: flex;
    flex-direction: column;
    gap: rem(20);
    margin-top: rem(20);
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: rem(16);
    margin-top: rem(24);

    @media (min-width: rem(600)) {
      flex-direction: row;
      justify-content: flex-start;
    }
  }
}
</style>
