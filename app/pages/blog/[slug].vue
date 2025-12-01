<script lang="ts" setup >
const route = useRoute()
//eslint-disable-next-line no-console
console.log(route)
</script>

<template>
  <div>
    <h1>l'article {{ route.params.slug }}</h1>
  </div>
</template>