import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CalendarDays, Flower2 } from 'lucide-react';
import { BookingForm } from '@/components/beauty/booking-form';
import { PageHeading } from '@/components/beauty/presentation';
import { getServiceFromSearch } from '@/lib/beauty';

export const Route = createFileRoute('/book')({
  validateSearch: (search: Record<string, unknown>) => ({ service: getServiceFromSearch(search.service) }),
  head: () => ({ meta: [
    { title: 'Book an Appointment Enquiry | Queen’s Beauty Parlour' },
    { name: 'description', content: 'Prepare an at-home beauty service enquiry for Queen’s Beauty Parlour and send it through WhatsApp.' },
    { property: 'og:title', content: 'Book an Appointment Enquiry | Queen’s Beauty Parlour' },
    { property: 'og:description', content: 'Prepare an enquiry draft and review it before sending through WhatsApp.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: BookPage,
});

function BookPage() {
  const { service: selectedService } = Route.useSearch();
  const [service, setService] = useState(selectedService);
  useEffect(() => setService(selectedService), [selectedService]);
  return <section className="booking-section section-space booking-page"><div className="container"><PageHeading eyebrow="LET’S MAKE TIME FOR YOU" title="Your next beauty moment." text="Tell us what you have in mind. Share a few details and prepare your appointment enquiry." /><div className="booking-layout"><div className="booking-intro"><div className="booking-detail"><CalendarDays strokeWidth={1.2} /><span>Your date and time are preferences.<br />Availability needs to be confirmed.</span></div><p className="booking-redirect-note">You’ll be redirected to WhatsApp to send your enquiry. Your appointment is confirmed only after the business replies.</p><Flower2 className="booking-flower" size={100} strokeWidth={0.6} /></div><BookingForm service={service} onServiceChange={setService} /></div></div></section>;
}