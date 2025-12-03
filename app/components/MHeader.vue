<script setup lang="ts">


const isNavOpen = ref(false)

const onMenuClick = () => {
  isNavOpen.value = !isNavOpen.value
}
</script>

<template>
  <div class="header">
    <NuxtLink to="/" >
      <LogoNavBar/>
    </NuxtLink>
    
    <nav v-if="isNavOpen">
      <ul class="header-liste">
        <li> <a href="/"> Acceuil </a> </li>
        <li> <a href="/dashboard" > Profil </a></li>
        <li>Contact</li>
        <li>A propos</li>
      </ul>
    </nav>
    <MButton variant="outline"  @click="onMenuClick">{{ isNavOpen ? 'Close' : 'Menu' }}</MButton>
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  border: rem(3);
  border-radius: rem(20);
  padding: rem(12) rem(16);
}

.header-liste {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: rem(12);
  align-items: center;
}

.header-liste li {
    font-size: rem(24);
    font-weight: semi-bold;
    font-family: Arial, Helvetica, sans-serif;
}

</style>
