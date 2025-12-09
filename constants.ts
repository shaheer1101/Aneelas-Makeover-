import { Service, Specialist } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Gold Haircut',
    description: 'A precision cut tailored to your face shape, including a luxury wash and blow-dry.',
    price: 85,
    duration: 60,
    category: 'Hair',
    image: 'https://picsum.photos/400/300?grayscale',
  },
  {
    id: 's2',
    name: 'Balayage & Tone',
    description: 'Hand-painted highlights for a natural sun-kissed look, finished with a custom toner.',
    price: 220,
    duration: 180,
    category: 'Hair',
    image: 'https://picsum.photos/401/300?grayscale',
  },
  {
    id: 's3',
    name: '24K Gold Facial',
    description: 'Anti-aging treatment using real gold leaf to firm, lift, and brighten the skin.',
    price: 150,
    duration: 75,
    category: 'Skin',
    image: 'https://picsum.photos/402/300?grayscale',
  },
  {
    id: 's4',
    name: 'Diamond Microdermabrasion',
    description: 'Deep exfoliation to remove dead skin cells and stimulate collagen production.',
    price: 110,
    duration: 60,
    category: 'Skin',
    image: 'https://picsum.photos/403/300?grayscale',
  },
  {
    id: 's5',
    name: 'Royal Manicure',
    description: 'Complete nail care with massage, paraffin wax, and gel polish.',
    price: 65,
    duration: 50,
    category: 'Nails',
    image: 'https://picsum.photos/404/300?grayscale',
  },
];

export const SPECIALISTS: Specialist[] = [
  { id: 'st1', name: 'Aneela Vogue', role: 'Owner & Senior Stylist', avatar: 'https://picsum.photos/100/100?random=1' },
  { id: 'st2', name: 'Marco Rossi', role: 'Color Expert', avatar: 'https://picsum.photos/100/100?random=2' },
  { id: 'st3', name: 'Sarah Jin', role: 'Esthetician', avatar: 'https://picsum.photos/100/100?random=3' },
];