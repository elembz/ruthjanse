import { getContext, setContext } from 'svelte';
import type {SerializedImage} from './types'

const CONTEXT_KEY = 'image-cache'

export function setImages(images: SerializedImage[]) {
	setContext(CONTEXT_KEY, images)
}

export function getImage(id: string): SerializedImage | undefined {
  const images: SerializedImage[] = getContext(CONTEXT_KEY) ?? []
	return images.find(it => it.id === id)
}