<script lang="ts" setup>
definePageMeta({
  layoutClass: 'is-fullwidth'
})
const username = ref('')
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

const config = useRuntimeConfig()

async function onSubmit () {
  try {
    //eslint-disable-next-line no-console
    console.log('=> Appel API pour créer un compte')
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value
    }

    const response = await fetch(`${config.public.apiUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription')
    }
    
    await navigateTo('/dashboard')
    
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Erreur inscription:', err)
    alert('Une erreur est survenue lors de l inscription.')
  }
}
</script>
<template>
  <div class="register">
    <div class="register__card">
      <MTitle as="h1" size="large" class="register__title">
        Créer un compte
      </MTitle>

      <form class="register__form" @submit.prevent="onSubmit">
        <div class="register__field">
          <label for="username" class="register__label">
            Nom d'utilisateur
          </label>
          <MLabbel
            id="username"
            v-model="username"
            type="text"
            size="default"
            placeholder="Pseudo"
            class="register__input"
          />
        </div>

        <div class="register__field">
          <label for="email" class="register__label">
            Email
          </label>
          <MLabbel
            id="email"
            v-model="email"
            type="email"
            size="default"
            placeholder="exemple@test.com"
            class="register__input"
          />
        </div>

        <div class="register__field">
          <label for="password" class="register__label">
            Mot de passe
          </label>
          <MLabbel
            id="password"
            v-model="password"
            type="password"
            size="default"
            placeholder="Mot de passe"
            class="register__input"
          />
        </div>

        <div class="register__field">
          <label for="firstName" class="register__label">
            Prénom <span class="register__optional">(optionnel)</span>
          </label>
          <MLabbel
            id="firstName"
            v-model="firstName"
            type="text"
            size="default"
            placeholder="Prénom"
            class="register__input"
          />
        </div>

        <div class="register__field">
          <label for="lastName" class="register__label">
            Nom <span class="register__optional">(optionnel)</span>
          </label>
          <MLabbel
            id="lastName"
            v-model="lastName"
            type="text"
            size="default"
            placeholder="Nom"
            class="register__input"
          />
        </div>

        <div class="register__actions">
          <MButton type="submit" class="register__button">
            S'inscrire
          </MButton>

          <p class="register__login">
            Déjà un compte ?
            <NuxtLink to="/login" class="register__link">
              Se connecter
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f4f6fb, #e9ecf5);
  padding: 1rem;

  &__card {
    width: 100%;
    max-width: 480px;
    background-color: #ffffff;
    border-radius: 16px;
    padding: 2.5rem 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

    /* Mobile */
    @media (max-width: 480px) {
      padding: 1.5rem 1.2rem;
      border-radius: 12px;
    }

    /* Desktop large */
    @media (min-width: 1200px) {
      max-width: 520px;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 2rem;

    @media (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    @media (max-width: 480px) {
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

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  &__optional {
    font-size: 0.8rem;
    font-weight: 400;
    color: #888;
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

  &__login {
    font-size: 0.9rem;
    color: #666;

    @media (max-width: 480px) {
      text-align: center;
    }
  }

  &__link {
    color: #4f46e5;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  /* Tablette */
  @media (max-width: 768px) {
    padding: 0.75rem;

    &__card {
      max-width: 90%;
    }
  }
}
</style>
