import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { beautyBusiness, formatEnquiry, serviceNames, whatsappUrl } from '@/lib/beauty';

export function BookingForm({ service, onServiceChange }: { service: string; onServiceChange: (value: string) => void }) {
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const contactUrl = whatsappUrl(beautyBusiness.whatsappNumber, draft);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();
    setDraft(formatEnquiry({ service: value('service'), name: value('name'), phone: value('phone'), date: value('date'), time: value('time'), address: value('address'), notes: value('notes') }));
    setCopied(false);
    setCopyError(false);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }
  return (
    <form onSubmit={prepare} className="booking-form" onChange={() => { setDraft(''); setCopied(false); }}>
      <div className="form-grid">
        <label className="form-field full">Select a service <select name="service" required value={service} onChange={event => onServiceChange(event.target.value)}><option value="">What can we help you with?</option>{serviceNames.map(name => <option key={name}>{name}</option>)}</select></label>
        <label className="form-field">Your name <Input name="name" autoComplete="name" placeholder="Full name" required maxLength={100} /></label>
        <label className="form-field">Phone number <Input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required pattern="[+0-9 ()\-]{7,20}" title="Enter a phone number with 7 to 20 digits or phone symbols" /></label>
        <label className="form-field">Preferred date <Input name="date" type="date" required /></label>
        <label className="form-field">Preferred time <Input name="time" type="time" required /></label>
        <label className="form-field full">Locality / address <Input name="address" autoComplete="street-address" placeholder="Your locality and home address" required maxLength={300} /></label>
        <label className="form-field full">Anything else? <span className="optional">(optional)</span><Textarea name="notes" placeholder="Your occasion, preferred look, or questions…" rows={3} maxLength={1500} /></label>
      </div>
      <Button type="submit" className="main-button w-full">Prepare my enquiry <ArrowUpRight /></Button>
      <p className="form-note">This form prepares a draft only. Nothing is sent or saved, and your appointment is not confirmed.</p>
      {draft && <div className="draft-result" role="status"><h3>Your enquiry draft</h3><p>Review your details before sharing. Nothing is sent until you use the WhatsApp button below.</p><Textarea aria-label="Enquiry draft" readOnly value={draft} rows={12} /><div className="mt-4 flex flex-wrap gap-3"><Button type="button" variant="outline" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy enquiry'}</Button>{contactUrl && <Button asChild><a href={contactUrl} target="_blank" rel="noopener noreferrer"><MessageCircle /> Send enquiry on WhatsApp</a></Button>}</div><p className="form-note">You’ll be redirected to WhatsApp with your enquiry prefilled — press send there to share it. Your appointment is confirmed only after the business replies.</p>{copyError && <p>Please select and copy the draft above manually.</p>}</div>}
    </form>
  );
}
