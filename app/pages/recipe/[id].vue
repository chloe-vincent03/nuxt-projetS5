<script lang="ts" setup >
const { id } = useRoute().params
const config = useRuntimeConfig()
const { data: recipe, error } = await useAsyncData('recipe-' + id, async () => {
  const { data } = await $fetch<{ data: Recipe }>(`${config.public.apiUrl}/api/recipes/${id}`)
  return data
})

if (error && error.value) throw new Error('Page not Found')
</script>

<template>
  <div>
    <h1>la recette {{ recipe.title }}</h1>
  </div>
</template>