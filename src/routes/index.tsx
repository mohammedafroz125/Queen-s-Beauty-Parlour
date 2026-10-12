import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Crown, Flower2, Heart, House, MapPin, Menu, MessageCircle, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { BookingForm } from '@/components/beauty/booking-form';
import { beautyBusiness, serviceCategories, whatsappUrl } from '@/lib/beauty';
import hero from '@/assets/beauty-hero.jpg';
import details from '@/assets/beauty-details.jpg';
import hair from '@/assets/hairstyling.jpg';
import care from '@/assets/beauty-care.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Queen’s Beauty Parlour | At-home beauty in Hyderabad' },
    { name: 'description', content: 'Discover makeup, hairstyling and beauty care at home with Queen’s Beauty Parlour in the Borananda / Hyderabad area. Prepare an appointment enquiry.' },
    { property: 'og:title', content: 'Queen’s Beauty Parlour — A little beauty, just for you' },
    { property: 'og:description', content: 'Explore at-home beauty services and prepare your appointment enquiry with Queen’s Beauty Parlour, Hyderabad.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: BeautyHome,
});
const servicePresentation = {
  Makeup: { text: 'Tell us the look you have in mind when you enquire.', image: hero, imageClass: 'makeup-image' },
  'Hair Services': { text: 'Ask about the hairstyle you have in mind.', image: hair, imageClass: '' },
  'Facial & Skin Care': { text: 'Discuss your skincare needs and available options.', image: details, imageClass: '' },
  Threading: { text: 'Ask about the threading services you need.', image: care, imageClass: '' },
  Waxing: { text: 'Ask about waxing options when you enquire.', image: care, imageClass: '' },
} as const;
const services = serviceCategories.flatMap(category => category.services.map(name => ({
  name,
  category: category.name,
  ...servicePresentation[category.name],
  alt: `Temporary beauty inspiration image for ${category.name.toLowerCase()}`,
})));
const galleryServices = serviceCategories
  .filter(category => category.name !== 'Waxing')
  .map(category => services.find(item => item.category === category.name))
  .filter((item): item is (typeof services)[number] => item !== undefined);
const faqs = [
  ['How do I enquire about an appointment?', 'Choose a service and fill in your preferred date, time and address below. Press “Prepare my enquiry” to review your details, then send them to us on WhatsApp. Your appointment is confirmed only after the business replies.'],
  ['Is my appointment confirmed when I fill in the form?', 'No. This form only prepares an enquiry draft; it does not send or save your details. An appointment is confirmed only after you speak with the business and agree on availability and service details.'],
  ['Which areas do you serve?', 'Queen’s Beauty Parlour is based in the Borananda / Hyderabad area. Exact at-home service coverage is awaiting confirmation. Please include your locality when enquiring.'],
  ['How much do the services cost?', 'Prices have not been published yet. Please discuss your chosen service, requirements and any travel charges with the business before agreeing to an appointment.'],
  ['Can I share a preferred look or special request?', 'Yes. Use the optional notes to describe your occasion, preferred look, or any relevant sensitivities. Specific treatments and products should be discussed before an appointment.'],
];
function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="Queen’s Beauty Parlour home"><Crown strokeWidth={1.2} /><span><span className="brand-name">Queen’s</span><span className="brand-caption">BEAUTY PARLOUR</span></span></a>;
}
function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-intro">{text}</p>}</div>;
}
function BeautyHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState('');
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [galleryImage, setGalleryImage] = useState<number | null>(null);
  const whatsapp = whatsappUrl(beautyBusiness.whatsappNumber, 'Hello Queen’s Beauty Parlour, I would like to enquire about an at-home beauty service.');
  function enquire(name: string) { setService(name); document.getElementById('booking')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }
  function openWhatsapp() { if (whatsapp) window.open(whatsapp, '_blank', 'noopener,noreferrer'); else setWhatsappOpen(true); }
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header" id="home"><div className="header-inner"><Brand /><nav aria-label="Main navigation" className="desktop-nav"><a href="#services">Our services</a><a href="#why-us">Why Queen’s</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a></nav><div className="header-actions"><Button asChild className="header-book"><a href="#booking">Book now <ArrowUpRight /></a></Button><Button size="icon" variant="ghost" className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></div>{menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">{[['Our services', '#services'], ['Why Queen’s', '#why-us'], ['Gallery', '#gallery'], ['Contact', '#contact']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={16} /></a>)}</nav>}</header>
    <main id="main">
      <section className="hero"><img src={hero} width={1920} height={1024} fetchPriority="high" alt="Temporary beauty inspiration: a soft rose makeup look" className="hero-image" /><div className="hero-content"><p className="eyebrow"><span className="eyebrow-line" /> BEAUTY, IN THE COMFORT OF HOME</p><h1>Queen’s<br />Beauty Parlour</h1><p className="hero-script">A little beauty. A little you-time.</p><p className="hero-intro">Makeup, hairstyling, and beauty care brought to your doorstep. Make space for yourself, without stepping out.</p><div className="hero-buttons"><Button asChild className="main-button"><a href="#booking">Enquire about a booking <ArrowUpRight /></a></Button><Button variant="link" asChild className="explore-link"><a href="#services">Explore services <ArrowDown /></a></Button></div><p className="hero-location"><MapPin size={15} /> Borananda / Hyderabad</p></div><span className="hero-photo-note">Temporary inspiration image</span><div className="hero-bottom"><span>YOUR SPACE. YOUR STYLE. YOUR MOMENT.</span><Flower2 size={22} strokeWidth={1} /></div></section>
      <section className="services section-space" id="services"><div className="container"><div className="section-top"><SectionHeading eyebrow="A LITTLE CARE, A BEAUTIFUL DIFFERENCE" title="Beauty, your way." text="For the everyday moments and the special ones. Find a little something for you." /><span className="small-editorial">AT-HOME BEAUTY SERVICES</span></div><div className="service-grid">{services.map((item, index) => <article className="service-card" key={item.name}><div className="service-photo"><img src={item.image} width={600} height={650} loading="lazy" alt={item.alt} className={item.imageClass} /><span className="photo-label">INSPIRATION IMAGE</span><span className="service-number">{String(index + 1).padStart(2, '0')}</span></div><div className="service-copy"><h3>{item.name}</h3><p className="service-subtitle">{item.category}</p><p>{item.text}</p><Button variant="link" className="service-enquire" onClick={() => enquire(item.name)}>Enquire about this service <ArrowUpRight /></Button></div></article>)}</div><p className="availability-note">Service options and pricing are to be discussed when you enquire.</p></div></section>
      <section className="why-section section-space" id="why-us"><div className="container why-layout"><div className="why-title"><p className="eyebrow">THE QUEEN’S APPROACH</p><h2>Not just beauty.<br /><em>A moment for you.</em></h2><p>There’s something lovely about taking a pause. We bring the beauty experience home, so your day can stay your own.</p><Button variant="link" asChild className="why-link"><a href="#booking">Let’s plan your you-time <ArrowRight /></a></Button></div><div className="why-points">{[{ Icon: House, title: 'In the comfort of home', text: 'Your familiar space, without a trip to the parlour.' }, { Icon: Heart, title: 'A look that feels like you', text: 'Share your preferences and the beauty look you have in mind.' }, { Icon: MessageCircle, title: 'A conversation comes first', text: 'Discuss services, pricing, and availability before you book.' }].map(({ Icon, title, text }) => <div className="why-point" key={title}><span className="why-icon"><Icon strokeWidth={1.3} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>
      <section className="gallery-section section-space" id="gallery"><div className="container"><div className="section-top"><SectionHeading eyebrow="THE BEAUTY MOODBOARD" title="A little inspiration." /><p className="gallery-note">A glimpse of the mood, not our portfolio.<br />All images are temporary, AI-generated placeholders.</p></div><div className="gallery-grid">{galleryServices.map((item, index) => <Button variant="ghost" className={`gallery-item gallery-item-${index}`} key={item.name} onClick={() => setGalleryImage(index)} aria-label={`View ${item.name} inspiration image`}><img src={item.image} alt={item.alt} width={600} height={700} loading="lazy" className={item.imageClass} /><span className="gallery-caption">{item.name}<Plus size={16} /></span></Button>)}</div></div></section>
      <section className="booking-section section-space" id="booking"><div className="container booking-layout"><div className="booking-intro"><p className="eyebrow">LET’S MAKE TIME FOR YOU</p><h2>Your next<br /><em>beauty moment.</em></h2><p>Tell us what you have in mind. Choose your service, share a few details, and prepare your appointment enquiry.</p><div className="booking-detail"><CalendarDays strokeWidth={1.2} /><span>Your date and time are preferences.<br />Availability needs to be confirmed.</span></div><div className="booking-whatsapp"><p>Prefer a conversation?</p><Button variant="outline" onClick={openWhatsapp}><MessageCircle /> Enquire on WhatsApp <ArrowUpRight /></Button><span>Opens WhatsApp with your enquiry prefilled. Appointment confirmed only after we reply.</span></div><Flower2 className="booking-flower" size={100} strokeWidth={0.6} /></div><BookingForm service={service} onServiceChange={setService} /></div></section>
      <section className="faq-section section-space" id="faq"><div className="container faq-layout"><SectionHeading eyebrow="A FEW THINGS TO KNOW" title="Before your beauty moment." /><div className="faq-list">{faqs.map(([question, answer]) => <details key={question} className="faq-item"><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></div></section>
      <section className="contact-section" id="contact"><div className="container contact-layout"><div><p className="eyebrow">WE’D LOVE TO HEAR FROM YOU</p><h2>Let’s talk beauty.</h2><p className="contact-location"><MapPin size={16} /> {beautyBusiness.location}</p><p className="contact-hours">Business hours: {beautyBusiness.businessHours}</p></div><div className="contact-actions"><Button className="main-button" onClick={openWhatsapp}><MessageCircle /> Start a WhatsApp enquiry <ArrowUpRight /></Button><p>You’ll be redirected to WhatsApp to send your enquiry.<br />Your appointment is confirmed only after the business replies.</p></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-top"><Brand footer /><p>Beauty at home.<br />A little time for yourself.</p><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#booking">Booking enquiry</a><a href="#faq">FAQs</a><a href="#contact">Contact</a></nav></div><div className="container footer-bottom"><p>© {new Date().getUTCFullYear()} Queen’s Beauty Parlour.</p><span>Made with a little care <Heart size={12} /></span></div></footer>
    <Button className="floating-whatsapp" size="icon" onClick={openWhatsapp} aria-label="WhatsApp enquiry" title="WhatsApp enquiry"><MessageCircle /></Button>
    <Dialog open={whatsappOpen} onOpenChange={setWhatsappOpen}><DialogContent><DialogTitle className="modal-title">Let’s connect.</DialogTitle><DialogDescription>WhatsApp could not be opened right now. You can prepare and copy an enquiry below, then share it however you prefer. No appointment is confirmed.</DialogDescription><Button asChild className="main-button" onClick={() => setWhatsappOpen(false)}><a href="#booking">Prepare an enquiry <ArrowUpRight /></a></Button></DialogContent></Dialog>
    <Dialog open={galleryImage !== null} onOpenChange={open => { if (!open) setGalleryImage(null); }}><DialogContent className="gallery-modal"><DialogTitle className="modal-title">Beauty inspiration</DialogTitle><DialogDescription>Temporary AI-generated imagery. Not actual client work.</DialogDescription>{galleryImage !== null && <img src={galleryServices[galleryImage]?.image} alt="Temporary beauty inspiration enlarged" width={800} height={800} />}</DialogContent></Dialog>
  </>;
}
