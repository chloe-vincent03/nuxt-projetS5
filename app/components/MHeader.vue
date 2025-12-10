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
const cookie = useCookie('recipe_token')
const isAuthenticated = computed(() => !!cookie.value)

const logout = () => {
  cookie.value = null
  window.location.reload()
}
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

        <template v-if="isAuthenticated">
          <li>
            <NuxtLink to="/dashboard"> <MButton>Mon Profil</MButton></NuxtLink>
          </li>
          <li>
            <MButton @click="logout">Se déconnecter</MButton>
          </li>
        </template>
        
        <template v-else>
          <li>
            <NuxtLink to="/login"><MButton variant="outline">Se connecter</MButton></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/register"><MButton variant="default">S'inscrire</MButton></NuxtLink>
          </li>
        </template>
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