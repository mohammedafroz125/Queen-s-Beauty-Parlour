import { describe, expect, it } from 'vitest';
import { beautyBusiness, formatEnquiry, whatsappUrl } from '@/lib/beauty';

const enquiry = { service: 'Hairstyling', name: 'Test Guest', phone: '9000000000', date: '2026-11-20', time: '10:30', address: 'Borananda, Hyderabad', notes: 'A soft updo' };

describe('Beauty enquiry boundaries', () => {
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
