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
    <p >{{ recipe.description }}</p>
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
  padding: 10px;
  font-family: "Inter", sans-serif;
}

.title {
  text-align: center;

}

.image-wrapper {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 35px;

  img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
}

.content {
  display: flex;
  gap: 30px;
}

.text-content {
  flex: 2;

  h2 {
    margin-top: 25px;
    margin-bottom: 10px;
  }

  .instructions li {
    list-style:  none;
  }
}

.ingredients-box {
  flex: 1;
  background: var(--color-bg);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--color-secondary);

  h3 {
    margin-bottom: 12px;
  }

  li {
    margin: 6px 0;
    line-height: 1.4;
  }
}
</style>
