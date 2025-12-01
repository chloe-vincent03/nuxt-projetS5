<script setup lang="ts">


const email = ref('')
const password = ref('')
const Nom = ref('')
const Prenom = ref('')

const postlogin =() => {
  //eslint-disable-next-line no-console
  console.log(Nom.value, Prenom.value, email.value, password.value)
}


</script>

<template>
  <form  @submit.prevent="postlogin" >
    <div class="form">
      <div>
        <MLabbel v-model="Nom" label="Nom" type="text" size="large" variant="default"/>
        <MLabbel v-model="Prenom" label="Prénom" type="text" size="large" variant="default"/>
        
      </div>
      <div>
        <MLabbel v-model="email" label="email" type="email" size="large" variant="default"/> 
        <MLabbel v-model="password" label="Mots de passe" type="password" size="large" variant="default"/> 
      </div>
    </div>
    <MButton>Se connecter</MButton>

  </form>
</template>

<style lang="scss" >
.form{
  display: flex;


}
</style>