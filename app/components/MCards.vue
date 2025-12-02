<script setup lang="ts" >
defineProps<{
  size?: 'small' | 'default' | 'large'
  recipe: Recipe
/*     label?: string
    titre?: string
    temps?: number */
/*  difficulte?: 'hard' | 'easy'| 'medium' */
}>()

</script>

<template>
  <div
    v-if="recipe"
    class="card" 
    :class="{
      small: size === 'small',
      large: size === 'large'
    }"  >
    <div>
      <NuxtImg :src="`/recipes/` + recipe.image_url" width="428" height="234" />
    </div>
    <div class="card-list-titre" >
      <MTitle  as="h3" size="small">{{recipe.title}}</MTitle>
      <p>{{recipe.description}} </p>
    </div>
    <div class="card-list">
      <p>{{ recipe.cuisine_name }} </p>
      <p v-if="recipe.goal_name">{{recipe.goal_name}} </p>
      <p>{{recipe.diet_name}}</p>
      <NuxtLink :to="`/recipe/${recipe.recipe_id}`" >
        <MButton variant="default" size="small" >Voir +</MButton>
      </NuxtLink>
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

    img {
      width: 100%;
      height: rem(170);
      object-fit: cover;
    }
  }

  &.large {
    width: rem(550);

    img {
      width: 100%;
      height: rem(346);
      object-fit: cover;
    }
  }

}
    .card-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.5rem;
        margin-top: 1rem;
        font-size: rem(12);
    }

    .card-list-titre{
        margin: rem(12);
    }

</style>

