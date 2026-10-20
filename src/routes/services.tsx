import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, ServiceCard } from '@/components/beauty/presentation';
import { servicePresentation } from '@/lib/beauty-presentation';
import { serviceCategories } from '@/lib/beauty';
import { pageHead, pageSeo } from '@/lib/seo';

export const Route = createFileRoute('/services')({
  head: () => pageHead({
    ...pageSeo('services'),
    path: '/services',
  }),
  component: ServicesPage,
});

function ServicesPage() {
  let index = 0;
  return <section className="page-content section-space"><div className="container"><PageHeading eyebrow="THE SERVICE MENU" title="Beauty, your way." text="Explore the services available to enquire about. Service details, pricing and availability can be discussed with the business." />
    {serviceCategories.map(category => <section className="service-category" key={category.name}><div className="category-heading"><p className="eyebrow">{category.name.toUpperCase()}</p><span>{category.services.length.toString().padStart(2, '0')} OPTIONS</span></div><div className="service-grid">{category.services.map(name => { const service = servicePresentation.find(item => item.name === name); const cardIndex = index++; return service ? <ServiceCard key={name} service={service} index={cardIndex} /> : null; })}</div></section>)}
    <p className="availability-note">Service options, pricing and availability are to be discussed when you enquire.</p>
  </div></section>;
}