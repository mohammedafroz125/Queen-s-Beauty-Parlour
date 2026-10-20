import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Heart, House, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/beauty/presentation';
import { pageHead, pageSeo } from '@/lib/seo';
import { content } from '@/lib/beauty';

export const Route = createFileRoute('/about')({
  head: () => pageHead({
    ...pageSeo('about'),
    path: '/about',
  }),
  component: AboutPage,
});

function AboutPage() {
  const { about } = content;
  const icons = [House, Heart, MessageCircle];
  return <section className="page-content section-space"><div className="container about-layout"><div><PageHeading eyebrow={about.eyebrow} title={about.title} text={about.text} /><Button asChild className="main-button"><Link to="/book" search={{ service: '' }}>Send an enquiry <ArrowUpRight /></Link></Button></div>
    <div className="about-points">{about.points.map((point, index) => { const Icon = icons[index] ?? MessageCircle; return <article className="why-point" key={point.title}><span className="why-icon"><Icon strokeWidth={1.3} /></span><div><h2>{point.title}</h2><p>{point.text}</p></div></article>; })}</div>
  </div></section>;
}