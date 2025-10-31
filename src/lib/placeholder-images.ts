import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  alt: string;
  src: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.images;
