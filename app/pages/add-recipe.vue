<script lang="ts" setup>
const title = ref('')
const description = ref('')
const image_url = ref('')
const cuisine_id = ref('')
const goal_id = ref('')

const DietaryInformation = ref('')
const AllergiesInformation = ref('')

const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

// Liste dynamique
const cuisines = ref([])

async function fetchCuisines() {
  try {
    const response = await fetch(`${config.public.apiUrl}/api/cuisines`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    
    const json = await response.json()

    if (json.success) {
      cuisines.value = json.data
    }
  } catch (err) {
    console.log('Erreur chargement cuisines', err)
  }
}

// Charger à l’arrivée sur la page
onMounted(() => {
  fetchCuisines()
})

async function onSubmit() {
  try {
    console.log('=> Api call to create recipe')

    const response = await fetch(`${config.public.apiUrl}/api/recipes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.value}`
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        image_url: image_url.value || null,
        cuisine_id: Number(cuisine_id.value),
        goal_id: goal_id.value,

        DietaryInformation_id: DietaryInformation.value || null,
        AllergiesInformation_id: AllergiesInformation.value || null
      })
    })

    const json = await response.json()

    if (!json.success) {
      console.error(json.message)
      return
    }

    await navigateTo('/dashboard')

  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div>
    <h1>Ajouter une recette</h1>

    <form @submit.prevent="onSubmit">
      
      <input v-model="title" type="text" placeholder="Titre" required>
      <input v-model="description" type="text" placeholder="Description" required>
      <input v-model="image_url" type="text" placeholder="URL de l'image">

      <select v-model="cuisine_id" required>
        <option disabled value="">Sélectionner une cuisine</option>
        <option 
          v-for="cuisine in cuisines" 
          :key="cuisine.cuisine_id" 
          :value="cuisine.cuisine_id"
        >
          {{ cuisine.name }}
        </option>
      </select>

      <input v-model="goal_id" type="text" placeholder="Goal ID" >

      <input v-model="DietaryInformation" type="text" placeholder="Dietary Information">
      <input v-model="AllergiesInformation" type="text" placeholder="Allergies Information">

      <MButton type="submit">Créer la recette</MButton>

    </form>
  </div>
</template>
