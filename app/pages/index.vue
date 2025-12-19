<script setup lang="ts">
import type { SanityHome } from '~/types/cms/home'

const query = groq`*[_type == "home"][0]`
const { data: home } = await useLazySanityQuery<SanityHome>(query)
const { urlFor } = useSanityImage()

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

const search = ref('')
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
  } else {
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

const totalPages = computed(() => Math.ceil(filteredRecipes.value.length / RECIPES_PER_PAGE))

function onPageClick (index: number){
  page.value = index
}

if (error && error.value) throw new Error('Page not Found')

// Head
watchEffect(() => {
  if (!home.value) return
  useHead({
    title: home.value.title,
    meta: [
      { name: 'description', content: home.value.description }
    ]
  })
})

// CARD SIZE RESPONSIVE
const isDesktop = ref(true)

function updateScreen () {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
})

const cardSize = computed(() => isDesktop.value ? 'large' : 'small')
</script>

<template>
  <div>
    <!-- HERO FULL WIDTH -->
    <div v-if="home" class="hero-fullwidth">
      <div class="hero">
        <div class="hero-content">
          <MTitle as="h1" size="large">{{ home.hero?.title }}</MTitle>
          <p>{{ home.hero?.subtitle }}</p>
          <MButton variant="outline" size="small">Explorer les recettes</MButton>
        </div>

        <img
          v-if="home.image"
          :src="urlFor(home.image)?.width(550).height(310).url()"
          :alt="home?.title"
          class="hero-image"
        />
      </div>
    </div>
  
    <!-- PAGE CONTENT -->
    <div class="page-content">
      <div class="recipes-filtres">
        <div
          v-for="(cuisine, index) in cuisines"
          :key="index"
          class="recipes-filtres__item"
        >
          <input
            :id="cuisine.name"
            type="checkbox"
            :value="cuisine.name"
            @input="onCheckboxInput"
          />
          <label :for="cuisine.name">{{ cuisine.name }}</label>
        </div>
      </div>

      <MTitle as="h2" size="medium">Liste des recettes :</MTitle>

      <div class="recipes-grid">
        <div v-for="(recipe, index) in displayedRecipes" :key="index">
          <MCards :recipe="recipe" :size="cardSize" />
        </div>
      </div>

      <!-- PAGINATION AVEC BOUTONS -->
      <div class="pagination-buttons">
        <MButton
          :disabled="page === 1"
          variant="outline"
          size="small"
          @click="onPageClick(page - 1)"
        >
          ◀ Précédent
        </MButton>

        <div class="page-numbers">
          <MButton
            v-for="n in totalPages"
            :key="`page-${n}`"
            :variant="page === n ? 'default' : 'outline'"
            size="small"
            @click="onPageClick(n)"
          >
            {{ n }}
          </MButton>
        </div>

        <MButton
          :disabled="page === totalPages"
          size="small"
          variant="outline"
          @click="onPageClick(page + 1)"
        >
          Suivant ▶
        </MButton>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
/* HERO FULL WIDTH */
.hero-fullwidth {
  width: 100vw; 
  margin-left: calc(-50vw + 50%);
}
.hero {
  --hero-dark: 0.45;
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

  @media (max-width: 480px) {
    padding: 10px;
  }
}

.hero-image {
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 550px;
  height: 310px;

  @media (max-width: 1023px) {
    position: relative;
    width: 100%;
    height: auto;
    margin-top: 20px;
  }
}

/* PAGE CONTENT */
.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;

  @media (max-width: 480px) {
    padding: 1rem;
  }
}

/* FILTRES */
.recipes-filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 25px 0;
}

.recipes-filtres__item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f7f7f7;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
  border: 1px solid #e5e5e5;
}

.recipes-filtres__item:hover {
  background: #ececec;
}

.recipes-filtres__item input {
  cursor: pointer;
}

.recipes-filtres__item label {
  cursor: pointer;
  font-size: 0.9rem;
}

/* GRID RECETTES */
.recipes-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.recipes-grid > div {
  display: flex;
  justify-content: center;
}

/* PAGINATION */
.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.page-numbers {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
