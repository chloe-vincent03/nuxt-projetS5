<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCookie } from '#app'
import type { SanitySiteSettings } from '~/types/cms/sitesettings'
import { useSanityImage } from '~/composables/useSanityImage'

defineProps<{
  logo: SanitySiteSettings['logo']
  navigation: SanitySiteSettings['navigation']
}>()

const isNavOpen = ref(false)
const toggleMenu = () => (isNavOpen.value = !isNavOpen.value)
const closeMenu = () => (isNavOpen.value = false)

const { urlFor } = useSanityImage()

const cookie = useCookie('recipe_token')
const isAuthenticated = computed(() => !!cookie.value)

const logout = () => {
  cookie.value = null
  window.location.reload()
}
</script>

<template>
  <header class="header">
    <div class="header__inner">

      <NuxtLink to="/" class="header__logo" @click="closeMenu">
        <img
          v-if="logo && urlFor(logo)"
          :src="urlFor(logo)?.url()"
          alt="Logo"
        />
      </NuxtLink>

      <nav
        class="header__nav"
        :class="{ 'header__nav--open': isNavOpen }"
      >
        <ul class="header__list">

          <li
            v-for="(item, index) in navigation"
            :key="index"
            class="header__item"
          >
            <NuxtLink
              :to="item.url"
              class="header__link"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>

          <template v-if="isAuthenticated">
            <li class="header__item">
              <NuxtLink to="/dashboard" @click="closeMenu">
                <MButton size="small" variant="outline" >
                  Mon Profil
                </MButton>
              </NuxtLink>
            </li>
            <li class="header__item">
              <MButton 
                size='small'
                type='button'
                @click="logout"
              >
                Se déconnecter
              </MButton>
            </li>
          </template>

          <template v-else>
            <li class="header__item">
              <NuxtLink to="/login" @click="closeMenu">
                <MButton size="small" variant="outline" >
                  Se connecter
                </MButton>
              </NuxtLink>
            </li>

            <li class="header__item">
              <NuxtLink to="/register" @click="closeMenu">
                <MButton size="small" >
                  S'inscrire
                </MButton>
              </NuxtLink>
            </li>
          </template>
        </ul>
      </nav>

      <button
        class="header__burger"
        aria-label='Menu'
        @click="toggleMenu"
      >
        <span
          class="header__burger-line"
          :class="{ 'header__burger-line--1': isNavOpen }"
        />
        <span
          class="header__burger-line"
          :class="{ 'header__burger-line--2': isNavOpen }"
        />
        <span
          class="header__burger-line"
          :class="{ 'header__burger-line--3': isNavOpen }"
        />
      </button>

    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; 
  background: var(--color-text-w);
  z-index: 1000; 

  &__inner {
    max-width: rem(1280px);
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo img {
    height: rem(48);
  }

  &__nav {
    position: fixed;
    inset: 0;
    background: var(--color-text-w);
    padding: 2rem;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--open {
      display: flex;
    }

    @media (min-width: rem(1024)) {
      all: unset;
      display: block;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;

    @media (min-width: rem(1024)) {
      flex-direction: row;
      gap: 1.5rem;
      text-align: left;
    }
  }

  &__link {
    text-decoration: none;
    color: var(--color-b);
    font-size: 1.6rem;

    @media (min-width: rem(1024)) {
      font-size: 1rem;
    }

    &:hover {
      color: var(--color-primary);
    }
  }

  &__burger {
    display: flex;
    flex-direction: column;
    gap: rem(6);
    background: none;
    border: none;
    cursor: pointer;
    z-index: rem(100);

    @media (min-width: rem(1024)) {
      display: none;
    }
  }

  &__burger-line {
    width: rem(28);
    height: rem(3);
    background: var(--color-b);
    transition: all 0.3s ease;

    &--1 {
      transform: rotate(45deg) translateY(8px);
    }
    &--2 {
      opacity: 0;
    }
    &--3 {
      transform: rotate(-45deg) translateY(-8px);
    }
  }
}
</style>
