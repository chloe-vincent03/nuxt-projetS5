<script setup lang="ts">
useHead({
  title: 'Page introuvable'
})
</script>

<template>
  <div class="not-found">
    <MTitle as="h1" size="large">
      404
    </MTitle>
    <p class="not-found__text">
      Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
    </p>
    <NuxtLink to="/">
      <MButton variant="default">
        Retour à l'accueil
      </MButton>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50vh;
  gap: rem(20);

  &__text {
    font-size: rem(18);
    margin-bottom: rem(20);
  }
}
</style>
