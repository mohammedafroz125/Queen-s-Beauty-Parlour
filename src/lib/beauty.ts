// Confirmed business WhatsApp: +91 89196 69857 → https://wa.me/918919669857
export const beautyBusiness = {
  name: 'Queen’s Beauty Parlour',
  location: 'Borananda, Hyderabad',
  whatsappNumber: '+91 89196 69857',
  phone: '',
};
export const serviceNames = ['Makeup', 'Hairstyling', 'Skincare', 'Other beauty services'] as const;
// Must compile as a JS regex with the 'v' flag: browsers drop an invalid pattern silently, which stops the field validating at all.
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
