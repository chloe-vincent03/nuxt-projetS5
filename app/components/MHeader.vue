<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/sitesettings'

defineProps<{
  logo: SanitySiteSettings['logo']
  navigation: SanitySiteSettings['navigation']
}>()

const isNavOpen = ref(false)

const onMenuClick = () => {
  isNavOpen.value = !isNavOpen.value
}
const { urlFor } = useSanityImage()
</script>

<template>
  <div class="header">
    <NuxtLink to="/">
      <img v-if="logo && urlFor(logo)" :src="urlFor(logo)?.url()" alt="" >
    </NuxtLink>

    <nav v-if="isNavOpen">
      <ul class="header-liste">
        <li
          v-for="(item, index) in navigation"
          :key="index"
        >
          <NuxtLink :to="item.url">
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <MButton variant="outline" @click="onMenuClick">
      {{ isNavOpen ? 'Close' : 'Menu' }}
    </MButton>
  </div>
</template>


<style>
  .header-liste{
    color: var(--color-b);
  }
</style>