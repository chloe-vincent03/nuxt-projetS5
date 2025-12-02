<script setup lang="ts" >

const config = useRuntimeConfig()
const [{ data: recipes, error }, { data: cuisines }] = await Promise.all([
  useAsyncData('recipes', async () => {
    const { data } = await $fetch<ApiResponse<Recipe[]>>(`${config.public.apiUrl}/api/recipes`)
    return data
  }),
  useAsyncData('cuisines', async () => {
    const { data } = await $fetch<ApiResponse<Cuisine[]>>(`${config.public.apiUrl}/api/cuisines`)
    return data
  })
])

const page = ref(1)
const RECIPES_PER_PAGE = 2

const search = ref ('')
const filters = ref<Cuisine['name'][]>([])

watch(()=> [filters.value, search.value], () => {
  page.value = 1
})

function onCheckboxInput ($event: Event){
  const target = $event.target
  if (!(target instanceof HTMLInputElement)) return
  const value = target.value
  if(!filters.value.includes(value)){
    filters.value.push(value)
  }else{
    const index = filters.value.findIndex(filterValue => filterValue === value)
    filters.value.splice(index,1)
  }
}
const filteredRecipes = computed<Recipe[]>(() => {
  if (!recipes.value) return []
  
  let results = recipes.value
  if(filters.value && filters.value.length){
    results = results.filter(recipe => filters.value.includes(recipe.cuisine_name))
  }
  
  if (search.value.length){
    results = results.filter(recipe => {
      return recipe.title.toLowerCase().includes(search.value.toLowerCase())
    })
  }

  return results
})


const displayedRecipes = computed<Recipe[]>(() => {
  if(!filteredRecipes.value) return []
  return filteredRecipes.value.slice((page.value -1)* RECIPES_PER_PAGE, page.value*RECIPES_PER_PAGE)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRecipes.value.length / RECIPES_PER_PAGE)
})

function onPageClick (index: number){
  page.value =index
}

if (error && error.value) throw new Error('Page not Found')
</script>

<template>

  <div>
    <div class="hero">
      <div class="hero-content">
        <MTitle as="h1" size="large">Libérez l'excellence culinaire</MTitle>
        <p>
          Explorez un monde de saveurs, découvrez des recettes artisanales et laissez l'arôme
          de notre passion pour la cuisine embaumer votre cuisine
        </p>
        <MButton variant="outline" size="small">explorer les recettes</MButton>
      </div>
    </div>
    <MTitle as="h1" size="large" >Page d'accueil</MTitle>
    <MTitle as="h2" size="medium" >Page d'accueil</MTitle>
    <MTitle as="h3" size="small" >Page d'accueil</MTitle>
    <div>
      <MButton size="tiny" variant="default">Click me</MButton>
      <MButton size="small" variant="default">Click me </MButton>
      <MButton size="default" variant="default">Click me</MButton>
      <MButton size="large" variant="default">Click me</MButton>
    </div>
    <div>
      <MButton size="tiny" variant="outline">Click me</MButton>
      <MButton size="small" variant="outline">Click me</MButton>
      <MButton size="default" variant="outline">Click me</MButton>
      <MButton size="large" variant="outline">Click me</MButton>
    </div>
    <div>
      <MLabbel placeholder="Géraldine" type="text" size="small" >Prénom (type: text size: small)</MLabbel>
      <MLabbel variant="success" placeholder="Dubois" type="text" size="default" >Nom (type: text size: default)</MLabbel>
      <MLabbel variant="error" placeholder="bonjour.." type="text" size="large" >text (type: text size: large)</MLabbel>
      <MLabbel variant="default" placeholder="cdcaef@gmail.com" type="email" size="default" >Ton adress mail</MLabbel>
      <MLabbel variant="default" placeholder="1245795" type="number" size="default" >Ton numero</MLabbel>
      <MLabbel variant="default" placeholder="1234ABC" type="password"  size="default">Password</MLabbel>
      <MLabbel variant="default" placeholder="noel" type="search"  size="default">faite une recherche</MLabbel>
    </div>

    <MLoginForm/>

    <input v-model="search" type="text" >
    <br>
    active filtres : {{ filters }}
    <br>
    <div class="pages" >
      <span v-for="n in totalPages" :key="`page-${n}` " @click="onPageClick(n)" >{{ n }}</span>
    </div>
    <div class="recipes-filtres" >
      <div v-for="(cuisine, index) in cuisines" :key="index" class="recipes-filtres__item" ><input :id="cuisine.name" type="checkbox" :value="cuisine.name" @input="onCheckboxInput" > <label :for="cuisine.name"> {{ cuisine.name }}</label></div>

    </div>


    <p>Liste des recettes :</p>
    <div class="recipes-grid">
      <NuxtLink v-for="(recipe, index) in displayedRecipes" :key="index" :to="`/recipe/${recipe.recipe_id}`" class="recipe-card-link">
        <MCards :recipe="recipe" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.hero {
  /* variable pour contrôler l'opacité de l'assombrissement */
  --hero-dark: 0.45;
  /* overlay sombre + image de fond */
  background-image: linear-gradient(rgba(0,0,0,var(--hero-dark)), rgba(0,0,0,var(--hero-dark))), url('/photo1.webp');
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;

  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
}

.hero-content {
  text-align: center;
  color: var(--color-text-w);
  max-width: 700px;
  padding: 20px;

}
</style>