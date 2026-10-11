// Confirm these contact details before making enquiries live.
export const beautyBusiness = {
  name: 'Queen’s Beauty Parlour',
  location: 'Borananda, Hyderabad',
  whatsappNumber: '',
  phone: '',
};
export const serviceNames = ['Makeup', 'Hairstyling', 'Skincare', 'Other beauty services'] as const;
export type Enquiry = { service: string; name: string; phone: string; date: string; time: string; address: string; notes: string };
export function formatEnquiry(data: Enquiry) {
  return `Hello Queen’s Beauty Parlour, I would like to enquire about an at-home appointment.\n\nService: ${data.service}\nName: ${data.name}\nPhone: ${data.phone}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nLocality / address: ${data.address}${data.notes ? `\nNotes: ${data.notes}` : ''}\n\nPlease let me know availability and pricing. This is an enquiry, not a confirmed booking.`;
}
export function whatsappUrl(number: string, message: string): string | null {
  const digits = number.replace(/[\s+()-]/g, '');
  if (!/^\d{8,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
