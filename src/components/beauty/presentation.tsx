import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-intro">{text}</p>}</div>;
}

export function PageHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></header>;
}

export function ServiceCard({ service, index }: { service: { name: string; category: string; text: string; image: string }; index: number }) {
  return <article className="service-card">
    <div className="service-photo"><img src={service.image} loading="lazy" alt={`Temporary inspiration image for ${service.name}`} /><span className="photo-label">INSPIRATION IMAGE</span><span className="service-number">{String(index + 1).padStart(2, '0')}</span></div>
    <div className="service-copy"><h3>{service.name}</h3><p className="service-subtitle">{service.category}</p><p>{service.text}</p><Button variant="link" asChild className="service-enquire"><Link to="/book" search={{ service: service.name }}>Book this service <ArrowUpRight /></Link></Button></div>
  </article>;
}

export function InspirationCard({ name, text, image }: { name: string; text: string; image: string }) {
  return <article className="inspiration-card"><div className="inspiration-photo"><img src={image} loading="lazy" alt={`Temporary inspiration image for ${name}`} /><span className="photo-label">ILLUSTRATIVE INSPIRATION</span></div><div className="inspiration-copy"><h3>{name}</h3><p>{text}</p></div></article>;
}