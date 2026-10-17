import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Heart, House, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/beauty/presentation';

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [
    { title: 'About Queen’s Beauty Parlour | At-home Beauty' },
    { name: 'description', content: 'Learn about Queen’s Beauty Parlour and its at-home beauty service enquiry experience.' },
    { property: 'og:title', content: 'About Queen’s Beauty Parlour' },
    { property: 'og:description', content: 'A beauty service designed around an at-home experience and a conversation before booking.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return <section className="page-content section-space"><div className="container about-layout"><div><PageHeading eyebrow="THE QUEEN’S APPROACH" title="A moment for you." text="Queen’s Beauty Parlour offers at-home beauty services in the Borananda / Hyderabad area. The experience begins with an enquiry to discuss the service, your preferences and availability." /><Button asChild className="main-button"><Link to="/book">Prepare an enquiry <ArrowUpRight /></Link></Button></div>
    <div className="about-points">{[{ Icon: House, title: 'At home', text: 'A beauty service enquiry for your familiar space.' }, { Icon: Heart, title: 'Your preferences', text: 'Share the look and details you have in mind.' }, { Icon: MessageCircle, title: 'A conversation first', text: 'Discuss pricing and availability before an appointment is agreed.' }].map(({ Icon, title, text }) => <article className="why-point" key={title}><span className="why-icon"><Icon strokeWidth={1.3} /></span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>
  </div></section>;
}