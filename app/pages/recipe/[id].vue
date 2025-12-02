<script lang="ts" setup >

const route = useRoute()
const config = useRuntimeConfig()
const { data: recipe, error } = await useAsyncData(`recipe-${route.params.id}`, async () => {
  const { data } = await $fetch<ApiResponse<FullRecipe >>(`${config.public.apiUrl}/api/recipes/${route.params.id}`)
  return data
})

if (!recipe.value || error.value) throw new Error('Recipe not found')
</script>

<template>
  <div v-if="recipe" class="recipe-page">
    <MTitle as="h1" size="large" class="title">{{ recipe.title }}</MTitle>
    <p class="description" >{{ recipe.description }}</p>
    <div class="image-wrapper">
      <NuxtImg :src="`/recipes/` + recipe.image_url" width="1200" height="800"/>
    </div>
    <div class="content">
      <div class="text-content">
        <p v-if="recipe.cuisine_name">Cuisine : {{ recipe.cuisine_name }}</p>
        <p v-if="recipe.goal_name">Objectif : {{ recipe.goal_name }}</p>
        <p v-if="recipe.diet_name">Régime : {{ recipe.diet_name }}</p>
        <p v-if="recipe.allergy_name">Allergènes : {{ recipe.allergy_name }}</p>

        <MTitle as="h2" size="small" >Instructions</MTitle>
        <ul class="instructions">
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            <strong>{{ instruction.step_number }}.</strong> {{ instruction.description }}
          </li>
        </ul>
      </div>
      <aside class="ingredients-box">
        <MTitle as="h2" size="small" >Ingredients</MTitle>
        <ul>
          <li
            v-for="(ingredient, index ) in recipe.ingredients"
            :key="index"
          >
            {{ ingredient.quantity }} {{ ingredient.unit }} de {{ ingredient.name }}
          </li>
        </ul>
      </aside>

    </div>
  </div>
</template>


<style scoped lang="scss">
.recipe-page {
  max-width: 1300px;
  margin: auto;
  padding: rem(10);
  font-family: "Inter", sans-serif;
}

.title {
  text-align: center;

}

.image-wrapper {
  width: 100%;
  border-radius: rem(14);
  overflow: hidden;
  margin-bottom: rem(35);

  img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
}

.content {
  display: flex;
  gap: rem(30);
}

.text-content {
  flex: 2;

  h2 {
    margin-top: rem(25);
    margin-bottom: rem(10);
  }

  .instructions li {
    list-style:  none;
  }
}

.description{
  text-align: center;
  font-size: rem(21);
}

.ingredients-box {
  flex: 1;
  background: var(--color-bg);
  padding: rem(20);
  border-radius: rem(12);
  border: rem(1) solid var(--color-secondary);

  h3 {
    margin-bottom: rem(12);
  }

  li {
    margin: rem(6) 0;
    line-height: 1.4;
  }
}
</style>
