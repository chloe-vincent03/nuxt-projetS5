<script lang="ts" setup>
const username = ref('')
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

const config = useRuntimeConfig()

async function onSubmit () {
  try {
    //eslint-disable-next-line no-console
    console.log('=> Appel API pour créer un compte')
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value
    }

    const response = await fetch(`${config.public.apiUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription')
    }
    
    await navigateTo('/dashboard')
    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Erreur inscription:', err)
    alert('Une erreur est survenue lors de l inscription.')
  }
}
</script>

<template>
  <div>
    <h1>Créer un compte</h1>
    <form action="" @submit.prevent="onSubmit">
      
      <div>
        <label for="username">Nom d'utilisateur</label>
        <input id="username" v-model="username" type="text" required placeholder="Pseudo">
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="exemple@test.com">
      </div>

      <div>
        <label for="password">Mot de passe</label>
        <input id="password" v-model="password" type="password" required>
      </div>

      <div>
        <label for="firstName">Prénom (optionnel)</label>
        <input id="firstName" v-model="firstName" type="text">
      </div>

      <div>
        <label for="lastName">Nom (optionnel)</label>
        <input id="lastName" v-model="lastName" type="text">
      </div>

      <MButton type="submit">S'inscrire</MButton>
    </form>

    <p>Déjà un compte ? <NuxtLink to="/login">Se connecter</NuxtLink></p>
  </div>
</template>

