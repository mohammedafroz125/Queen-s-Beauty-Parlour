import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CalendarDays, Flower2 } from 'lucide-react';
import { BookingForm } from '@/components/beauty/booking-form';
import { PageHeading } from '@/components/beauty/presentation';
import { getServiceFromSearch } from '@/lib/beauty';
import { pageHead } from '@/lib/seo';

export const Route = createFileRoute('/book')({
  validateSearch: (search: Record<string, unknown>) => ({ service: getServiceFromSearch(search['service']) }),
  head: () => pageHead({
    title: 'Send a Beauty Enquiry | Queen’s Beauty Parlour',
    description: 'Choose a beauty service, share your preferences and send an appointment enquiry to Queen’s Beauty Parlour through WhatsApp.',
    path: '/book',
  }),
  component: BookPage,
});

function BookPage() {
  const { service: selectedService } = Route.useSearch();
  const [service, setService] = useState(selectedService);
  useEffect(() => setService(selectedService), [selectedService]);
  return <section className="booking-section section-space booking-page"><div className="container"><PageHeading eyebrow="LET’S MAKE TIME FOR YOU" title="Your next beauty moment." text="Tell us what you have in mind. Share a few details and prepare your appointment enquiry." /><div className="booking-layout"><div className="booking-intro"><div className="booking-detail"><CalendarDays strokeWidth={1.2} /><span>Your date and time are preferences.<br />Availability needs to be confirmed.</span></div><p className="booking-redirect-note">You’ll be redirected to WhatsApp to send your enquiry. Your appointment is confirmed only after the business replies.</p><Flower2 className="booking-flower" size={100} strokeWidth={0.6} /></div><BookingForm service={service} onServiceChange={setService} /></div></div></section>;
}