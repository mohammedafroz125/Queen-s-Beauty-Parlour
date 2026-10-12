import { describe, expect, it } from 'vitest';
import { beautyBusiness, formatEnquiry, phonePattern, serviceCategories, serviceNames, whatsappUrl } from '@/lib/beauty';

const enquiry = { service: 'Hairstyling', name: 'Test Guest', phone: '9000000000', date: '2026-11-20', time: '10:30', address: 'Borananda, Hyderabad', notes: 'A soft updo' };

describe('Beauty enquiry boundaries', () => {
  it('keeps exactly the requested service catalogue and category groupings', () => {
    expect(serviceCategories).toEqual([
      { name: 'Makeup', services: ['Makeup'] },
      { name: 'Hair Services', services: ['Hair Straightening', 'Hair Curls', 'Baby Haircut', 'V-Cut', 'U-Cut', 'Feather Cut'] },
      { name: 'Facial & Skin Care', services: ['Diamond Facial', 'Gold Facial', 'D-Tan'] },
      { name: 'Threading', services: ['Eyebrow Threading', 'Upper Lip Threading'] },
      { name: 'Waxing', services: ['Waxing'] },
    ]);
    expect(serviceNames).toEqual(serviceCategories.flatMap(category => category.services));
  });
  it('shows the confirmed business hours without adding days', () => {
    expect(beautyBusiness.businessHours).toBe('5:00 PM–11:00 PM');
  });
  it('sends enquiries to the confirmed business WhatsApp number', () => {
    expect(whatsappUrl(beautyBusiness.whatsappNumber, 'Enquiry')).toBe('https://wa.me/918919669857?text=Enquiry');
  });
  it('does not create a WhatsApp destination for an unconfirmed number', () => {
    expect(whatsappUrl('', 'Enquiry')).toBeNull();
    expect(whatsappUrl('not confirmed', 'Enquiry')).toBeNull();
  });
  it('preserves the chosen service and appointment preferences in a draft', () => {
    const draft = formatEnquiry(enquiry);
    expect(draft).toContain('Service: Hairstyling');
    expect(draft).toContain('Name: Test Guest');
    expect(draft).toContain('Phone: 9000000000');
    expect(draft).toContain('Preferred date: 2026-11-20');
    expect(draft).toContain('Preferred time: 10:30');
    expect(draft).toContain('Locality / address: Borananda, Hyderabad');
    expect(draft).toContain('Notes: A soft updo');
  });
  it('keeps an enquiry clearly unconfirmed and omits empty notes', () => {
    const draft = formatEnquiry({ ...enquiry, notes: '' });
    expect(draft).toContain('not a confirmed booking');
    expect(draft).not.toContain('Notes:');
  });
  it('url-encodes the prefilled message so spaces and special characters survive', () => {
    const url = whatsappUrl(beautyBusiness.whatsappNumber, formatEnquiry(enquiry));
    expect(url).not.toContain(' ');
    expect(url).toContain(encodeURIComponent('Preferred date: 2026-11-20'));
    expect(decodeURIComponent(url!.split('?text=')[1] ?? '')).toContain('Locality / address: Borananda, Hyderabad');
  });
});

describe('Phone field validation', () => {
  const re = new RegExp(`^(?:${phonePattern})$`, 'v');
  it('compiles as a browser pattern so the field keeps validating', () => {
    expect(() => new RegExp(`^(?:${phonePattern})$`, 'v')).not.toThrow();
  });
  it('accepts real phone numbers and rejects letters, short or separator-only input', () => {
    expect(re.test('+91 98765 43210')).toBe(true);
    expect(re.test('9000000000')).toBe(true);
    expect(re.test('040-2345 6789')).toBe(true);
    expect(re.test('abcdefghij')).toBe(false);
    expect(re.test('123')).toBe(false);
    expect(re.test('-------')).toBe(false);
  });
});
