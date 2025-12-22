<script lang="ts" setup>
const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

/* =========================
   Submit
   ========================= */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCreate (payload: any) {
  const res = await fetch(`${config.public.apiUrl}/api/recipes/full`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie.value}`
    },
    body: JSON.stringify(payload)
  })

  const json = await res.json()
  if (json.success) await navigateTo('/dashboard')
}
</script>

<template>
  <RecipeForm @submit="handleCreate" />
</template>
