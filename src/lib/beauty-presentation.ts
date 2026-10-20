import { content } from './beauty';

export const servicePresentation = content.services
  .filter((service) => service.visible)
  .map(({ name, category, text, image }) => ({ name, category, text, image }));

export const makeupLooks = content.makeupLooks
  .filter((look) => look.visible)
  .map(({ name, text, image }) => ({ name, text, image }));

export const galleryImages = content.gallery
  .filter((item) => item.visible)
  .map(({ name, image, alt }) => ({ name, image, alt }));
