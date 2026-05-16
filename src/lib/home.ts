import { resolve } from "node:path";

import { imageAllDimensions, type ImageDimensions } from "./image-utils";
import { withBase } from "./urls";

const HOME_IMAGE_DIR = "public/images/home";
const HOME_IMAGE_URL_BASE = "/images/home";
const HOME_FALLBACK_IMAGE = "home.png";
const HOME_IMAGE_HEIGHT_PX = 2000;

type HomeImageVariant = "pc" | "mobile";

export interface HomeSlideImage extends ImageDimensions {
  mobileSrc?: string;
}

export const homeImageHeightPx = HOME_IMAGE_HEIGHT_PX;

const imageKey = (src: string) => src.split("/").pop() ?? src;

const prioritizeFallbackImage = (images: ImageDimensions[]) => [
  ...images.filter((image) => imageKey(image.src) === HOME_FALLBACK_IMAGE),
  ...images.filter((image) => imageKey(image.src) !== HOME_FALLBACK_IMAGE),
];

const variantImageDimensions = async (
  variant: HomeImageVariant,
): Promise<ImageDimensions[]> =>
  prioritizeFallbackImage(
    await imageAllDimensions(
      resolve(process.cwd(), HOME_IMAGE_DIR, variant),
      `${HOME_IMAGE_URL_BASE}/${variant}`,
    ),
  );

const fallbackSlideImage = (): HomeSlideImage => ({
  src: withBase(`${HOME_IMAGE_URL_BASE}/pc/${HOME_FALLBACK_IMAGE}`),
  width: HOME_IMAGE_HEIGHT_PX,
  height: HOME_IMAGE_HEIGHT_PX,
});

export const homeSlideImages = async (enableSlideshow: boolean): Promise<HomeSlideImage[]> => {
  const [pcImages, mobileImages] = await Promise.all([
    variantImageDimensions("pc"),
    variantImageDimensions("mobile"),
  ]);
  const mobileImageByKey = new Map(mobileImages.map((image) => [imageKey(image.src), image]));

  const desktopImages = enableSlideshow
    ? pcImages
    : pcImages.filter((image) => imageKey(image.src) === HOME_FALLBACK_IMAGE);
  const slides = desktopImages.length > 0 ? desktopImages : [fallbackSlideImage()];

  return slides.map((desktopImage) => ({
    ...desktopImage,
    mobileSrc: mobileImageByKey.get(imageKey(desktopImage.src))?.src,
  }));
};
