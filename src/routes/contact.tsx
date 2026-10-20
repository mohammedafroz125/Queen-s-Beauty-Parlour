import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Clock3, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/beauty/presentation';
import { beautyBusiness, whatsappUrl } from '@/lib/beauty';
import { pageHead } from '@/lib/seo';

export const Route = createFileRoute('/contact')({
  head: () => pageHead({
    title: 'Contact Queen’s Beauty Parlour | Borananda, Hyderabad',
    description: 'Contact Queen’s Beauty Parlour on WhatsApp, view confirmed hours and find the Borananda, Hyderabad location label.',
    path: '/contact',
  }),
  component: ContactPage,
});

function ContactPage() {
  const contactUrl = whatsappUrl(beautyBusiness.whatsappNumber, 'Hello Queen’s Beauty Parlour, I would like to enquire about a beauty service.');
  return <section className="page-content section-space"><div className="container contact-page-layout"><div><PageHeading eyebrow="WE’D LOVE TO HEAR FROM YOU" title="Let’s talk beauty." text="Questions about a service or appointment? Start a conversation with Queen’s Beauty Parlour." /></div>
    <div className="contact-details"><div className="contact-detail"><span><MessageCircle /></span><div><p>WhatsApp</p><a href={contactUrl ?? undefined} target="_blank" rel="noopener noreferrer">+91 8919669847 <ArrowUpRight size={15} /></a></div></div><div className="contact-detail"><span><Clock3 /></span><div><p>Business hours</p><strong>{beautyBusiness.businessHours}</strong></div></div><div className="contact-detail"><span><MapPin /></span><div><p>Location</p><strong>{beautyBusiness.location}</strong></div></div>{contactUrl && <Button asChild className="main-button"><a href={contactUrl} target="_blank" rel="noopener noreferrer"><MessageCircle /> Start a WhatsApp enquiry <ArrowUpRight /></a></Button>}<p className="contact-confirmation">Your appointment is confirmed only after the business replies. Hours do not indicate appointment availability.</p></div>
  </div></section>;
}