import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/beauty/presentation';
import { galleryImages } from '@/lib/beauty-presentation';

export const Route = createFileRoute('/gallery')({
  head: () => ({ meta: [
    { title: 'Beauty Inspiration Gallery | Queen’s Beauty Parlour' },
    { name: 'description', content: 'A curated moodboard of temporary beauty inspiration images for Queen’s Beauty Parlour.' },
    { property: 'og:title', content: 'Beauty Inspiration Gallery | Queen’s Beauty Parlour' },
    { property: 'og:description', content: 'Explore illustrative beauty inspiration. Images are not client work or a portfolio.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: GalleryPage,
});

function GalleryPage() {
  return <section className="page-content section-space"><div className="container"><PageHeading eyebrow="THE BEAUTY MOODBOARD" title="A little inspiration." text="A collection of illustrative beauty references—not a client portfolio or examples of Queen’s Beauty Parlour’s work." />
    <div className="gallery-page-grid">{galleryImages.map((item, index) => <figure className={`gallery-page-item gallery-page-item-${index % 3}`} key={item.name}><img src={item.image} alt={`Temporary illustrative beauty inspiration: ${item.name}`} loading="lazy" /><figcaption>{item.name}<span>INSPIRATION IMAGE</span></figcaption></figure>)}</div>
  </div></section>;
}