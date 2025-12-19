<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/sitesettings'
const SITESETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`

const { data } = await useLazySanityQuery<SanitySiteSettings>(SITESETTINGS_QUERY)


useHead(() => ({
  title: data.value?.title ?? 'Titre du site',
  meta: [
    {
      name: 'description',
      content: data.value?.description ?? 'Description du site'
    }
  ]
}))

</script>

<template>

  <main class="ly-default" >
    <MHeader v-if="data" v-bind="{navigation: data.navigation, logo: data.logo}" />
    <div
      class="ly-default__content"
      :class="$route.meta.layoutClass"
    >
      <slot />
    </div>
    <MFooter v-if="data" v-bind="{navigation: data.navigation, logofooter: data.logofooter}" />
  </main>

</template>

<style scoped lang="scss">
  .ly-default {
  padding-top: rem(80);

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;

    @media (max-width: 480px) {
      padding: 1rem;
    }
  }

  &__content.is-fullwidth {
    max-width: none;
    padding: 0;
  }
}
</style>