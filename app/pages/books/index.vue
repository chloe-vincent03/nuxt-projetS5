<script setup lang="ts">
import type { SanityBook } from '~/types/cms/book'

const BOOKS_QUERY = groq`*[
  _type == "book"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, image, publishedAt}`

const { data: books } = await useLazySanityQuery<SanityBook[]>(BOOKS_QUERY)

const { urlFor } = useSanityImage()
</script>

<template>
  <main class="books__container">
    <MTitle as="h1" size="large" class="books__title">Books</MTitle>
    <ul class="books__list">
      <li v-for="book in books" :key="book._id" class="books__item">
        <nuxt-link :to="`/books/${book.slug.current}`" class="books__item-link">
          <img
            v-if="book.image"
            :src="urlFor(book.image)?.width(550).height(310).url()"
            :alt="book?.title"
            class="books__item-image"
          />
          <MTitle as="h2" size="small">{{ book.title }}</MTitle>
          <p class="books__item-date">{{ new Date(book.publishedAt).toLocaleDateString() }}</p>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
  .books {
  &__container {
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.2s ease;

    &:hover {
      text-decoration: underline;
    }

    &-link {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    &-image {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 0.75rem;
    }

    &-date {
      font-size: 0.875rem;
      color: #666;
    }
  }
}

</style>