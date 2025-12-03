<script lang="ts" setup>
const email = ref ('')
const password = ref('')

const config = useRuntimeConfig()

async function onSubmit (){
  try{
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
    console.log(err)
  }
}


</script>

<template>
  <div>
    <h1>Connexions</h1>
    <form action="" @submit.prevent="onSubmit">
      <input v-model="email" type="text">
      <input v-model="password" type="password">
      <MButton type="submit" >Se connecter</MButton>
    </form>
  </div>
</template>