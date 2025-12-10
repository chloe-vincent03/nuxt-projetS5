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
    <slot />
    <MFooter v-if="data" v-bind="{navigation: data.navigation}" />
  </main>

</template>

<style scoped lang="scss">
  .ly-default {
  padding-top: rem(80);
  }
</style>