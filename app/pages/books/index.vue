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
  <main class="container mx-auto min-h-screen max-w-3xl p-8">
    <h1 class="text-4xl font-bold mb-8">Books</h1>
    <ul class="flex flex-col gap-y-4">
      <li v-for="book in books" :key="book._id" class="hover:underline">
        <nuxt-link :to="`/books/${book.slug.current}`">
          <img
            v-if="book.image"
            :src="urlFor(book.image)?.width(550).height(310).url()"
            :alt="book?.title"
            class="aspect-video rounded-xl"
            width="550"
            height="310"
          />
          <h2 class="text-xl font-semibold">{{ book.title }}</h2>
          <p>{{ new Date(book.publishedAt).toLocaleDateString() }}</p>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>