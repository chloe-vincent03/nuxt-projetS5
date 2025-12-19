<script setup lang="ts">
import type { SanityBook } from '~/types/cms/book'

const BOOKS_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{slug, title, image, body, author ->{name}, categories[] -> {...}}`
const { params } = useRoute()

const { data: book } = await useLazySanityQuery<SanityBook>(BOOKS_QUERY, params)


const { urlFor } = useSanityImage()

</script>

<template>
  <main v-if="book" class="book__container">
    <a href="/books" class="book__back-link">&larr; Back to books</a>

    <img
      v-if="book.image"
      :src="urlFor(book.image)?.width(550).height(310).url()"
      :alt="book?.title"
      class="book__image"
    />

    <h1 v-if="book.title" class="book__title">{{ book.title }}</h1>

    <div class="book__meta">
      <p v-if="book.publishedAt" class="book__meta-date">
        Published: {{ new Date(book.publishedAt).toLocaleDateString() }}
      </p>
      <p v-if="book.author" class="book__meta-author">Fait par : {{ book.author.name }}</p>
    </div>

    <div class="book__categories">
      <p>Catégorie :</p>
      <ul class="book__categories-list">
        <li v-for="(categorie, index) in book.categories" :key="index" class="book__categories-item">
          {{ categorie.label }}
        </li>
      </ul>
    </div>

    <div v-if="book.body" class="book__content">
      <SanityContent :blocks="book.body" />
    </div>
  </main>
</template>


<style lang="scss" scoped>
  .book {
  &__container {
    max-width: rem(768);
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__back-link {
    font-size: 0.875rem;
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      text-decoration: underline;
      color: var(--color-secondary)
    }
  }

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;

    @media (max-width: rem(480)) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-b);

    &-author,
    &-date {
      margin: 0;
    }
  }

  &__categories {
    margin: 1rem 0;

    &-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0.25rem 0;
    }

    &-item {
      font-size: 0.875rem;
      color: var(--color-b);
    }
  }
}
</style>