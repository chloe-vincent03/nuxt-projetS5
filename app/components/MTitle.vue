<script setup lang="ts">
defineProps<{
  as: 'h1' | 'h2' | 'h3' 
  size: 'large' | 'medium' | 'small'
}> ()
</script>


<template>
  <component :is="as" class="title" :class="{'small':size ==='small','medium':size ==='medium', 'large':size ==='large'}" ><slot/> </component>
</template>

<style lang="scss">

.title {
    font-weight: semi-bold;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;

    &.large{
        font-size: rem(64);
    }
    &.medium{
        font-size: rem(48);
    }
    &.small{
        font-size: rem(36);
    }
}
</style>