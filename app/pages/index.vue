<script setup lang="ts">
import type { FullRecipe } from '~/types/api/recipe'
import type { SanityHome } from '~/types/cms/home'

const query = groq`*[_type == "home"][0]`
const { data: home } = await useLazySanityQuery<SanityHome>(query)
const { urlFor } = useSanityImage()

const config = useRuntimeConfig()
const [{ data: recipes, error }, { data: cuisines }] = await Promise.all([
  useAsyncData('recipes', async () => {
    const { data } = await $fetch<ApiResponse<FullRecipe[]>>(`${config.public.apiUrl}/api/recipes`)
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

const filteredRecipes = computed<FullRecipe[]>(() => {
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

const displayedRecipes = computed<FullRecipe[]>(() => {
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
  <div class="home">
    <!-- HERO FULL WIDTH -->
    <section v-if="home" class="home__hero-fullwidth">
      <div class="hero">
        <div class="hero__content">
          <MTitle as="h1" size="large" class="hero__title">
            {{ home.hero?.title }}
          </MTitle>
          <p class="hero__subtitle">
            {{ home.hero?.subtitle }}
          </p>
          <MButton variant="outline" size="small">
            Explorer les recettes
          </MButton>
        </div>

        <img
          v-if="home.image"
          :src="urlFor(home.image)?.width(550).height(310).url()"
          :alt="home?.title"
          class="hero__image"
        />
      </div>
    </section>

    <!-- PAGE CONTENT -->
    <section class="home__content">
      <!-- Filtres -->
      <div class="recipes-filters">
        <div
          v-for="(cuisine, index) in cuisines"
          :key="index"
          class="recipes-filters__item"
        >
          <input
            :id="cuisine.name"
            type="checkbox"
            :value="cuisine.name"
            @input="onCheckboxInput"
            class="recipes-filters__checkbox"
          />
          <label
            :for="cuisine.name"
            class="recipes-filters__label"
          >
            {{ cuisine.name }}
          </label>
        </div>
      </div>

      <MTitle as="h2" size="medium" class="home__title">
        Liste des recettes :
      </MTitle>

      <!-- Grille recettes -->
      <div class="recipes-grid">
        <div
          v-for="(recipe, index) in displayedRecipes"
          :key="index"
          class="recipes-grid__item"
        >
          <MCards :recipe="recipe" :size="cardSize" />
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <MButton
          :disabled="page === 1"
          variant="outline"
          size="small"
          @click="onPageClick(page - 1)"
        >
          ◀ Précédent
        </MButton>

        <div class="pagination__pages">
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
    </section>
  </div>
</template>

<style scoped lang="scss">
.home {
  &__hero-fullwidth {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  }

  &__content {
    max-width: rem(1200);
    margin: 0 auto;
    padding: rem(15);

    @media (max-width: rem(480)) {
      padding: rem(10);
    }
  }

  &__title {
    margin-bottom: rem(15);
  }
}

.hero {
  --hero-dark: 0.45;
  background-image: linear-gradient(
      rgba(0, 0, 0, var(--hero-dark)),
      rgba(0, 0, 0, var(--hero-dark))
    ),
    url('/photo1.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &__content {
    text-align: center;
    color: var(--color-text-w);
    max-width: rem(700);
    padding: rem(20);

    @media (max-width: rem(480)) {
      padding: rem(10);
    }
  }

  &__title {
    margin-bottom: rem(10);
  }

  &__subtitle {
    margin-bottom: rem(20);
  }

  &__image {
    position: absolute;
    bottom: 10%;
    right: 10%;
    width: rem(550);
    height: rem(310);

    @media (max-width: rem(1023)) {
      position: relative;
      width: 100%;
      height: auto;
      margin-top: rem(20);
    }
  }
}

/* FILTRES */
.recipes-filters {
  display: flex;
  flex-wrap: wrap;
  gap: rem(10);
  margin: rem(25) 0;

  &__item {
    display: flex;
    align-items: center;
    gap: rem(6);
    padding: rem(6) rem(12);
    background: var(--color-bg);
    border-radius: rem(8);
    cursor: pointer;
    transition: 0.2s ease;
    border: rem(1) solid var(--color-border);

    &:hover {
      background: var(--color-primary);
    }
  }

  &__checkbox {
    cursor: pointer;
  }

  &__label {
    cursor: pointer;
    font-size: 0.9rem;
  }
}

/* GRID RECETTES */
.recipes-grid {
  margin-top: rem(20);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: rem(25);

  @media (max-width: rem(1023)) {
    gap: rem(16);
  }

  @media (max-width: rem(480)) {
    grid-template-columns: 1fr;
  }

  &__item {
    display: flex;
    justify-content: center;
  }
}

/* PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: rem(10);
  margin: rem(25) 0;
  flex-wrap: wrap;

  &__pages {
    display: flex;
    gap: rem(6);
    flex-wrap: wrap;
  }
}
</style>
