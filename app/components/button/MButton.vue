<script setup lang="ts" >
defineProps<{
  href?: string 
  variant?: 'default' | 'outline' | 'supp'
  size?: 'default' | 'tiny' | 'small' |'large'
}>()
</script>


<template>
  <a v-if="href" href="#" class="button" :class="{'outline':variant ==='outline', 'supp':variant ==='supp', 'small':size ==='small','tiny':size ==='tiny', 'large':size ==='large' }" ><slot/></a>
  <button v-else class="button" :class="{'outline':variant ==='outline', 'supp':variant ==='supp', 'small':size ==='small','tiny':size ==='tiny', 'large':size ==='large'}" ><slot/></button>

</template>


<style lang="scss" >

.button{
    --button-bg-color : var(--color-primary);
    --button-color-text : var(--color-text-w);
    --button-bg-hover: var(--color-secondary);
    background: var(--button-bg-color);
    color: var(--button-color-text);
    border: none;
    border-radius: rem(8);
    text-decoration: none;
    margin: rem(4);
    cursor: pointer;
    padding: rem(16) rem(18);
    font-size: rem(14);
    &:hover {
        background: var(--button-bg-hover);
    }
    &.tiny {
        padding: rem(8) rem(10);
        font-size: rem(10);
    }
    &.small{
        padding: rem(12) rem(16);
        font-size: rem(12);
    }
    &.large{
        padding: rem(20) rem(24);
        font-size: rem(16);
    }
/*     &--disabled {
        background: #CCCCCC;
        color: #666666;
        cursor: not-allowed;
    }
    &--pressed {
        background: #030d67; 
    }*/
    &.outline{
        background: var(--button-color-text);
        color: var(--button-bg-color);
        border: 2px solid var(--button-bg-color);
        &:hover {
        background: var(--button-bg-color);
        color: var(--button-color-text);
        }
    &.supp{
        background: var(--color-error);
        color: var(--color-text-w);

    }
/*         &--focus {
            outline: 4px solid #96a1f3;
    
        }
        &--disabled {
            background: #fffefe;
            color: #666666;
            border-color: #CCCCCC;
            cursor: not-allowed;
            
        }*/
    }
}


</style>