<script setup lang="ts" >
definePageMeta({
  middleware: ['auth']
})


async function logout () {
  const cookie = useCookie('recipe_token')
  cookie.value = null
  navigateTo('/login')
}
const config = useRuntimeConfig()

const { data } = await useAsyncData('my-recipes', () => {
  const cookie = useCookie('recipe_token')
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`,{
    headers :{
      Authorization: `Bear ${cookie.value}`
    }
  })
})
</script>

<template>
  <div class="p-dashboard" >
    <h1>Dashboard</h1>
    <MButton type="button" @click="logout">Se déconnecter</MButton>
  </div>
</template>