<script setup lang="ts">
const model = defineModel<string>()
defineProps<{
  variant?: 'default' | 'error' | 'success'
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url' | 'file'
  size?: 'small' | 'default' | 'large'
  placeholder?: string
  label?: string
}>()
</script>

<template>
  <label v-if="label" >{{label}}</label>
  <input
    v-model="model"
    :type="type"
    class="labbel"
    :placeholder="placeholder"
    :class="{
      error: variant === 'error',
      success: variant === 'success', small: size ==='small',   default: size ==='default', large: size ==='large',
    }"
  >
</template>


<style lang="scss">
.labbel {
  --label-bg-color: var(--color-secondary);
  --label-bg-error: var(--color-error);
  --label-error-hover: var(--color-error-secondary);
  --label-bg-success: var(--color-success);
  --label-success-hover: var(--color-success-secondary);

  font-size: rem(16);
  margin: rem(6);
  display: block;
  border: 2px solid var(--label-bg-color);
  border-radius: rem(8);

  text-align: start;

  &.error {
    border-color: var(--label-bg-error);
    &:hover {
      background-color: var(--label-error-hover);
    }
  }

  &.success {
    border-color: var(--label-bg-success);
    &:hover {
      background-color: var(--label-success-hover);
    }
  }
  &.small{
  padding: rem(5) rem(25);
  }
  &.large{
  padding: rem(20) rem(100);
  }
  &.default{
  padding: rem(10) rem(50);
  }
}
</style>
