import siteContent from '../../content/site.json';

export const content = siteContent;
export const beautyBusiness = content.business;

export const serviceCategories = Array.from(
  content.services.reduce((categories, service) => {
    if (!service.visible) return categories;
    const existing = categories.get(service.category) ?? [];
    existing.push(service.name);
    categories.set(service.category, existing);
    return categories;
  }, new Map<string, string[]>()),
  ([name, services]) => ({ name, services }),
);

export const serviceNames = serviceCategories.flatMap((category) => category.services);

export function getServiceFromSearch(value: unknown): string {
  return typeof value === 'string' && serviceNames.includes(value) ? value : '';
}

export const phonePattern = "(?=(\\D*\\d){7})[\\d\\s\\(\\)\\+\\.\\-]{7,20}";
export type Enquiry = { service: string; name: string; phone: string; date: string; time: string; address: string; notes: string };

export function formatEnquiry(data: Enquiry) {
  return `Hello Queen’s Beauty Parlour, I would like to enquire about an at-home appointment.\n\nService: ${data.service}\nName: ${data.name}\nPhone: ${data.phone}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nLocality / address: ${data.address}${data.notes ? `\nNotes: ${data.notes}` : ''}\n\nPlease let me know availability and pricing. This is an enquiry, not a confirmed booking.`;
}

export function whatsappUrl(number: string, message: string): string | null {
  const digits = number.replace(/[\s+()-]/g, '');
  if (!/^\d{8,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
