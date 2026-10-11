import { describe, expect, it } from 'vitest';
import { beautyBusiness, formatEnquiry, whatsappUrl } from '@/lib/beauty';
describe('Beauty enquiry boundaries', () => {
  it('does not create a WhatsApp destination for an unconfirmed number', () => {
    expect(whatsappUrl(beautyBusiness.whatsappNumber, 'Enquiry')).toBeNull();
    expect(whatsappUrl('not confirmed', 'Enquiry')).toBeNull();
  });
  it('preserves the chosen service and appointment preferences in a draft', () => {
    const draft = formatEnquiry({ service: 'Hairstyling', name: 'Test Guest', phone: '9000000000', date: '2026-11-20', time: '10:30', address: 'Borananda', notes: 'A soft updo' });
    expect(draft).toContain('Service: Hairstyling');
    expect(draft).toContain('Preferred date: 2026-11-20');
    expect(draft).toContain('Preferred time: 10:30');
    expect(draft).toContain('Notes: A soft updo');
  });
  it('encodes an enquiry only when a real contact is configured', () => {
    expect(whatsappUrl('+91 90000 00000', 'Makeup & hair')).toBe('https://wa.me/919000000000?text=Makeup%20%26%20hair');
  });
});
