<script setup lang="ts">


const email = ref('')
const password = ref('')
const Nom = ref('')
const Prenom = ref('')

const postlogin =() => {
    console.log(Nom.value, Prenom.value, email.value, password.value)
}



</script>

<template>
    <form  @submit.prevent="postlogin" >
        <div class="form">
        <div>
        <MLabbel label="Nom" type="text" size="large" variant="default" v-model="Nom"/>
        <MLabbel label="Prénom" type="text" size="large" variant="default" v-model="Prenom"/>
        
    </div>
    <div>
        <MLabbel label="email" type="email" size="large" variant="default" v-model="email"/> 
        <MLabbel label="Mots de passe" type="password" size="large" variant="default" v-model="password"/> 
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