<script setup lang="ts" >
defineProps<{
    size?: 'small' | 'default' | 'large'
/*     label?: string
    titre?: string
    temps?: number */
   /*  difficulte?: 'hard' | 'easy'| 'medium' */
}>()
</script>

<template>
    <div class="card" :class="{
         small: size === 'small',
         large: size === 'large'
       }" >
        <img src="/images/Recipe Image.jpg" alt="">
        <div class="card-list-titre" >
        <MTitle  as="h3" size="small">Recette essaie1</MTitle>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div class="card-list">
            <p>3h - </p>
            <p>preparation facile - </p>
            <p>10 personnes</p>
            <MButton variant="default" size="small" >Voir +</MButton>
        </div>
    </div>

</template>

<style lang="scss" >
.card {
    background: var(--color-b);
    color: var(--color-text-w);
    border-radius: rem(20);
    overflow: hidden;
    width: 100%;
    width: rem(426);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding-bottom: 1.5rem;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;

    &:hover{
         transform: scale(1.03);
        box-shadow: 0 rem(8) rem(18) rgba(0, 0, 0, 0.15);

    }
      &.small {
    width: rem(311);

  }

  &.large {
    width: rem(632);

  }

}
    .card-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        margin-top: 1rem;
    }

    .card-list-titre{
        margin: rem(12);
    }

</style>

