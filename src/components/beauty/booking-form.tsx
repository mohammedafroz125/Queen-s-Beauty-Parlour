import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { beautyBusiness, formatEnquiry, phonePattern, serviceCategories, whatsappUrl } from '@/lib/beauty';

export function BookingForm({ service, onServiceChange }: { service: string; onServiceChange: (value: string) => void }) {
  const [submitError, setSubmitError] = useState('');
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    const enquiry = formatEnquiry({ service: value('service'), name: value('name'), phone: value('phone'), date: value('date'), time: value('time'), address: value('address'), notes: value('notes') });
    const contactUrl = whatsappUrl(beautyBusiness.whatsappNumber, enquiry);
    if (!contactUrl) {
      setSubmitError('The WhatsApp destination is not available. Please contact the business directly.');
      return;
    }
    setSubmitError('');
    window.location.assign(contactUrl);
  }
  return (
    <form onSubmit={prepare} className="booking-form">
      <div className="form-grid">
        <label className="form-field full">Select a service <select name="service" required value={service} onChange={event => onServiceChange(event.target.value)}><option value="">What can we help you with?</option>{serviceCategories.map(category => <optgroup key={category.name} label={category.name}>{category.services.map(name => <option key={name} value={name}>{name}</option>)}</optgroup>)}</select></label>
        <label className="form-field">Your name <Input name="name" autoComplete="name" placeholder="Full name" required maxLength={100} /></label>
        <label className="form-field">Phone number <Input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required pattern={phonePattern} title="Enter a phone number with at least 7 digits, e.g. +91 98765 43210" /></label>
        <label className="form-field">Preferred date <Input name="date" type="date" required /></label>
        <label className="form-field">Preferred time <Input name="time" type="time" required /></label>
        <label className="form-field full">Locality / address <Input name="address" autoComplete="street-address" placeholder="Your locality and home address" required maxLength={300} /></label>
        <label className="form-field full">Anything else? <span className="optional">(optional)</span><Textarea name="notes" placeholder="Your occasion, preferred look, or questions…" rows={3} maxLength={1500} /></label>
      </div>
      <Button type="submit" className="main-button w-full">Send Enquiry <ArrowUpRight /></Button>
      <p className="form-note">You’ll be redirected to WhatsApp with your enquiry prefilled. Press send there to share it; your appointment is confirmed only after the business replies.</p>
      {submitError && <p className="form-note" role="alert">{submitError}</p>}
    </form>
  );
}
