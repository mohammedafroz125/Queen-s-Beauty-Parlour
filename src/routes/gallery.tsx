import { createFileRoute } from '@tanstack/react-router';
import { PageHeading } from '@/components/beauty/presentation';
import { galleryImages } from '@/lib/beauty-presentation';
import { pageHead, pageSeo } from '@/lib/seo';

export const Route = createFileRoute('/gallery')({
  head: () => pageHead({
    ...pageSeo('gallery'),
    path: '/gallery',
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return <section className="page-content section-space"><div className="container"><PageHeading eyebrow="THE BEAUTY MOODBOARD" title="A little inspiration." text="A collection of illustrative beauty references—not a client portfolio or examples of Queen’s Beauty Parlour’s work." />
    <div className="gallery-page-grid">{galleryImages.map((item, index) => <figure className={`gallery-page-item gallery-page-item-${index % 3}`} key={item.name}><img src={item.image} alt={item.alt} loading="lazy" /><figcaption>{item.name}<span>INSPIRATION IMAGE</span></figcaption></figure>)}</div>
  </div></section>;
}