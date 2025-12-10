<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/sitesettings'
const { urlFor } = useSanityImage()

defineProps<{
  navigation: SanitySiteSettings['navigation']
  logofooter: SanitySiteSettings['logofooter']
}>()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <NuxtLink to="/" class="footer__logo">
        <img
          v-if="logofooter && urlFor(logofooter)"
          :src="urlFor(logofooter)?.url()"
          alt="Logo"
          class="footer__logo-img"
        />
      </NuxtLink>

      <nav class="footer__nav-wrapper">
        <ul class="footer__nav">
          <li
            v-for="(item, index) in navigation"
            :key="index"
            class="footer__nav-item"
          >
            <NuxtLink :to="item.url" class="footer__nav-link">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <ul class="footer__social">
          <li class="footer__social-item"><IconInsta/></li>
          <li class="footer__social-item"><IconFacebook/></li>
          <li class="footer__social-item"><IconYoutube/></li>
          <li class="footer__social-item"><ic-baseline-tiktok/></li>
        </ul>
      </nav>
    </div>
    <p class="footer__text">Copyright: © 2025 Chloé Vincent</p>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: var(--color-b);
  color: var(--color-text-w);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  padding: rem(16);

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(24);
    width: 100%;
    max-width: rem(1200);
    margin: 0 auto;

    @media (min-width: rem(768)) {
      flex-direction: row; 
      justify-content: space-between;
      align-items: center;
    }
  }

  &__logo {
    order: 1; 
    @media (min-width: rem(768)) {
      order: 1;/
    }
  }

  &__logo-img {
    max-width: rem(150);
    height: auto;
  }

  &__nav-wrapper {
    order: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(16);
    width: 100%;

    @media (min-width: rem(768)) {
      order: 2; 
      flex-direction: row;
      justify-content: center;
      gap: rem(32);
      width: auto;
    }
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: rem(16);
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
  }

  &__nav-link {
    text-decoration: none;
    color: var(--color-text-w);
    font-size: rem(18);
    transition: color 0.3s;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__social {
    order: 3; 
    display: flex;
    gap: rem(16);
    list-style: none;
    padding: 0;
    margin: 0;

    @media (min-width: rem(768)) {
      order: 3; 
    }
  }

  &__social-item {
    font-size: rem(24);
    cursor: pointer;
  }

  &__text {
    font-size: rem(14);
    text-align: center;
    margin-top: rem(16);
  }
}
</style>
