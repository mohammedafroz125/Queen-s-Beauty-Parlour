import lookOne from '@/assets/look-1.webp';
import lookTwo from '@/assets/look-2.webp';
import lookThree from '@/assets/look-3.webp';
import lookFour from '@/assets/look-4.webp';
import lookFive from '@/assets/look-5.webp';
import lookSix from '@/assets/look-6.webp';
import hairOne from '@/assets/hair-1.webp';
import hairTwo from '@/assets/hair-2.webp';
import hairThree from '@/assets/hair-3.webp';
import hairFour from '@/assets/hair-4.webp';
import hairFive from '@/assets/hair-5.webp';
import hairSix from '@/assets/hair-6.webp';
import careOne from '@/assets/care-1.webp';
import careTwo from '@/assets/care-2.webp';
import careThree from '@/assets/care-3.webp';
import careFour from '@/assets/care-4.webp';
import careFive from '@/assets/care-5.webp';
import careSix from '@/assets/care-6.webp';
import waxImage from '@/assets/beauty-inspiration-waxing.jpg';
import galleryOne from '@/assets/gallery-1.webp';
import galleryTwo from '@/assets/gallery-2.webp';
import galleryThree from '@/assets/gallery-3.webp';
import galleryFour from '@/assets/gallery-4.webp';
import galleryFive from '@/assets/gallery-5.webp';
import gallerySix from '@/assets/gallery-6.webp';

export const servicePresentation = [
  { name: 'Bridal Makeup', category: 'Makeup', text: 'A bridal makeup look to discuss and shape around your occasion.', image: lookOne },
  { name: 'Hair Straightening', category: 'Hair Services', text: 'A straight hairstyle reference for your enquiry.', image: hairOne },
  { name: 'Hair Curls', category: 'Hair Services', text: 'A curled hairstyle reference for your enquiry.', image: hairTwo },
  { name: 'Baby Haircut', category: 'Hair Services', text: 'A short haircut reference to discuss when enquiring.', image: hairThree },
  { name: 'V-Cut', category: 'Hair Services', text: 'A long layered haircut reference for your enquiry.', image: hairFour },
  { name: 'U-Cut', category: 'Hair Services', text: 'A long haircut reference to discuss when enquiring.', image: hairFive },
  { name: 'Feather Cut', category: 'Hair Services', text: 'A feathered hairstyle reference for your enquiry.', image: hairSix },
  { name: 'Diamond Facial', category: 'Facial & Skin Care', text: 'A skincare inspiration image for your enquiry.', image: careOne },
  { name: 'Gold Facial', category: 'Facial & Skin Care', text: 'A skincare inspiration image for your enquiry.', image: careTwo },
  { name: 'D-Tan', category: 'Facial & Skin Care', text: 'A skincare inspiration image for your enquiry.', image: careThree },
  { name: 'Eyebrow Threading', category: 'Threading', text: 'A threading inspiration image for your enquiry.', image: careFour },
  { name: 'Upper Lip Threading', category: 'Threading', text: 'A threading inspiration image for your enquiry.', image: careFive },
  { name: 'Waxing', category: 'Waxing', text: 'A waxing inspiration image for your enquiry.', image: waxImage },
] as const;

export const makeupLooks = [
  { name: 'Natural makeup', text: 'A light, softly defined makeup reference.', image: lookTwo },
  { name: 'Soft glam', text: 'A softly polished look with gentle definition.', image: lookThree },
  { name: 'Party makeup', text: 'A more defined makeup reference for an evening out.', image: lookFour },
  { name: 'Bridal makeup', text: 'A traditional bridal-style makeup reference.', image: lookFive },
  { name: 'Traditional makeup', text: 'A classic look paired with traditional jewellery.', image: lookSix },
  { name: 'Evening makeup', text: 'An evening look with softly defined features.', image: galleryOne },
] as const;

export const galleryImages = [
  { name: 'Softly defined', image: galleryTwo },
  { name: 'A traditional moment', image: galleryThree },
  { name: 'Fresh and simple', image: galleryFour },
  { name: 'Warm tones', image: galleryFive },
  { name: 'Natural texture', image: gallerySix },
  { name: 'A quiet detail', image: careSix },
] as const;