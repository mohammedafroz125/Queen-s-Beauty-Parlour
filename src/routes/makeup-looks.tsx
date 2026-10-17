import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading, InspirationCard } from '@/components/beauty/presentation';
import { makeupLooks } from '@/lib/beauty-presentation';

export const Route = createFileRoute('/makeup-looks')({
  head: () => ({ meta: [
    { title: 'Makeup Looks & Inspiration | Queen’s Beauty Parlour' },
    { name: 'description', content: 'Explore natural, soft glam, party, bridal, traditional and evening makeup inspiration.' },
    { property: 'og:title', content: 'Makeup Looks & Inspiration | Queen’s Beauty Parlour' },
    { property: 'og:description', content: 'Illustrative makeup references to help describe the look you have in mind.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: MakeupLooksPage,
});

function MakeupLooksPage() {
  return <section className="page-content section-space"><div className="container"><PageHeading eyebrow="MAKEUP INSPIRATION" title="A look that feels like you." text="Explore visual references for different makeup moods. These style categories are inspiration only; Makeup is the listed service." />
    <div className="inspiration-grid">{makeupLooks.map(item => <InspirationCard key={item.name} {...item} />)}</div>
    <div className="page-cta"><p>Have a look in mind? Share it when you enquire about Makeup.</p><Button asChild className="main-button"><Link to="/book" search={{ service: 'Makeup' }}>Enquire about Makeup <ArrowUpRight /></Link></Button></div>
  </div></section>;
}