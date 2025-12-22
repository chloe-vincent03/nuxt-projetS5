<script lang="ts" setup>
definePageMeta({
  layoutClass: 'is-fullwidth'
})
const email = ref ('')
const password = ref('')

const config = useRuntimeConfig()

async function onSubmit (){
  try{
    //eslint-disable-next-line no-console
    console.log('=> Api call to login')
    const response = await fetch(`${config.public.apiUrl}/api/users/login`,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    const json = await response.json()

    const token = json.data.token
    
    const cookie = useCookie('recipe_token')
    cookie.value = token

    await navigateTo('/dashboard')

  }catch (err) {
    //eslint-disable-next-line no-console
    console.log(err)
  }
}

</script>

<template>
  <div class="login">
    <div class="login__card">
      <MTitle as="h1" size="large" class="login__title">
        Connexion
      </MTitle>

      <form class="login__form" @submit.prevent="onSubmit">
        <div class="login__field">
          <label for="email" class="login__label">Email</label>
          <MLabbel
            v-model="email"
            for="email"
            type="email"
            size="default"
            placeholder="Email"
            class="login__input"
          />
        </div>

        <div class="login__field">
          <label for="password" class="login__label">Mot de passe</label>
          <MLabbel
            v-model="password"
            for="password"
            type="password"
            size="default"
            placeholder="Mot de passe"
            class="login__input"
          />
        </div>

        <div class="login__actions">
          <MButton type="submit" class="login__button">
            Se connecter
          </MButton>

          <p class="login__register">
            Pas de compte ?
            <NuxtLink to="/register" class="login__link">
              S'inscrire
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg), var(--color-border));
  padding: 1rem;

  &__card {
    width: 100%;
    max-width: rem(420);
    background-color: var(--color-text-w);
    border-radius: rem(16);
    padding: 2.5rem 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

    /* Mobile */
    @media (max-width: 480px) {
      padding: 1.5rem 1.2rem;
      border-radius: rem(12);
    }

    /* Desktop large */
    @media (min-width: 1200px) {
      max-width: rem(460);
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 2rem;

    @media (max-width: rem(480)) {
      margin-bottom: 1.5rem;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    @media (max-width: rem(480)) {
      gap: 1.2rem;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  &__label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #444;

    @media (max-width: rem(480)) {
      font-size: 0.85rem;
    }
  }

  &__input {
    width: 100%;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1.2rem;
  }

  &__button {
    width: 100%;
  }

  &__register {
    font-size: 0.9rem;
    color: var(--color-b);

    @media (max-width: rem(480)) {
      text-align: center;
    }
  }

  &__link {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: rem(768)) {
    padding: 0.75rem;

    &__card {
      max-width: 90%;
    }
  }
}
</style>

