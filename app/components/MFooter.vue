<script setup lang="ts" >
import type { SanitySiteSettings } from '~/types/cms/sitesettings'
const { urlFor } = useSanityImage()

defineProps<{
  navigation: SanitySiteSettings['navigation']
  logofooter: SanitySiteSettings['logofooter']
}>()

</script>


<template>
  <section class="footer" >
    <div class="footer-div" >
      <NuxtLink to="/" class="header__logo" >
        <img
          v-if="logofooter && urlFor(logofooter)"
          :src="urlFor(logofooter)?.url()"
          alt="Logo"
        />
      </NuxtLink>
      <nav >
        <ul class="footer-nav" >
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
      <ul class="footer-nav" >
        <li><IconInsta/></li>
        <li><IconFacebook/></li>
        <li><IconYoutube/></li>
        <li><ic-baseline-tiktok/></li>
      </ul>

    </div>
    <p class="footer-text" >Copyright: © 2025 Chloé Vincent</p>
  </section>
</template>

<style lang="scss"  >
.footer{
    --footer-bg-color: var(--color-b);
    --footer-text: var(--color-text-w);
    background: var(--footer-bg-color);
    color: var(--footer-text);
    font-weight: semi-bold;
    font-family: Arial, Helvetica, sans-serif;

}
.footer-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  border: rem(3);
  border-radius: rem(20);
  padding: rem(12) rem(16);
}

.footer-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: rem(12);
  align-items: center;   
  font-size: rem(18);
}

.footer-text{
font-size: rem(12);
text-align: center;
padding: rem(8);
}
</style>