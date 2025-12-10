<script lang="ts" setup>
const email = ref ('')
const password = ref('')

const config = useRuntimeConfig()

async function onSubmit (){
  try{
    //eslint-disable-next-line no-console
    console.log('=> Api call to login')
    const response = await fetch(`${config.public.apiUrl}/api/users/login`,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    const json = await response.json()

    const token = json.data.token
    
    const cookie = useCookie('recipe_token')
    cookie.value = token

    await navigateTo('/dashboard')

  }catch (err) {
    //eslint-disable-next-line no-console
    console.log(err)
  }
}

</script>

<template>
  <div>
    <MTitle as="h1" size="large">Connexions</MTitle>
    <form action="" @submit.prevent="onSubmit">
      <label for="email">Email</label>
      <MLabbel v-model="email" for="email" type="email" size="default" placeholder="Email" />
      <label for="password">Mot de passe</label>
      <MLabbel v-model="password" for="password" type="password" size="default" placeholder="Mot de passe" />
      <div> 
        <MButton type="submit" >Se connecter</MButton>
        <p>Pas de compte ? <NuxtLink to="/register">S'inscrire</NuxtLink></p>
      </div>
    </form>
  </div>
</template>