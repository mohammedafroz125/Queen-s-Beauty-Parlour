import { beautyBusiness, content, serviceNames } from './beauty';

export const siteUrl = 'https://queensbeauty.vercel.app';

export function canonicalUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function pageHead({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl(path) },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl(path) },
      ...(image ? [{ rel: 'preload', as: 'image' as const, href: image }] : []),
    ],
  };
}

export const beautySalonStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: beautyBusiness.name,
  url: siteUrl,
  telephone: beautyBusiness.whatsappNumber,
  address: {
    '@type': 'PostalAddress',
    addressLocality: beautyBusiness.location,
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '17:00',
      closes: '23:00',
    },
  ],
  makesOffer: serviceNames.map((name) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name },
  })),
};

export function pageSeo(key: keyof typeof content.pageSeo) {
  return content.pageSeo[key];
}
