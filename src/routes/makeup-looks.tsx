import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, InspirationCard } from '@/components/beauty/presentation';
import { makeupLooks } from '@/lib/beauty-presentation';
import { pageHead, pageSeo } from '@/lib/seo';

export const Route = createFileRoute('/makeup-looks')({
  head: () => pageHead({
    ...pageSeo('makeupLooks'),
    path: '/makeup-looks',
  }),
  component: MakeupLooksPage,
});

function MakeupLooksPage() {
  return <section className="page-content section-space"><div className="container"><PageHeading eyebrow="MAKEUP INSPIRATION" title="A look that feels like you." text="Explore visual references for different makeup moods. These style categories are inspiration only; Bridal Makeup is the listed service." />
    <div className="inspiration-grid">{makeupLooks.map(item => <InspirationCard key={item.name} {...item} />)}</div>
    <div className="page-cta"><p>Have a look in mind? Share it when you enquire about Bridal Makeup.</p><Button asChild className="main-button"><Link to="/book" search={{ service: 'Bridal Makeup' }}>Enquire about Bridal Makeup <ArrowUpRight /></Link></Button></div>
  </div></section>;
}