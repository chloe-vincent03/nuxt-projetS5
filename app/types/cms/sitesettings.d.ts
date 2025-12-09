import type { SanityDocument } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

type SanitySiteSettings = SanityDocument & {
  title: string 
  description : string 
  logo : SanityImageSource
  navigation : SanityNavigation[]
}

type SanityNavigation = {
  label: string 
  url: string
}