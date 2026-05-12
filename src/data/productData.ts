import type { Product } from '../types';

import productMasala from '../assets/images/product_01_masala_chai.jpg';
import productKulhad from '../assets/images/product_02_kulhad_chai.jpg';
import productSaffron from '../assets/images/product_03_saffron_cardamom_chai.jpg';

export const products: Product[] = [
  {
    id: 'masala-reserve',
    name: 'Masala Chai Reserve',
    description:
      'The everyday cup, the one you grew up smelling from the kitchen at sunrise. Strong Assam leaves folded slowly around fresh ginger, green cardamom, cinnamon, and a quiet whisper of clove.',
    tastingNotes: 'Ginger, cardamom, cinnamon, full-bodied Assam.',
    image: productMasala,
    imageAlt: 'Editorial still of Masala Chai Reserve packaging on a warm dark surface.',
  },
  {
    id: 'kulhad-street',
    name: 'Kulhad Street Blend',
    description:
      'The platform chai, bottled. A heavier brew with a smoky bite, built to taste exactly like clay cups pressed warm into your palm while a train waits at the station.',
    tastingNotes: 'Earthy, smoky, nostalgic, deeply steeped.',
    image: productKulhad,
    imageAlt: 'Editorial still of Kulhad Street Blend with clay cup composition.',
  },
  {
    id: 'saffron-gold',
    name: 'Saffron Cardamom Gold',
    description:
      'A slow-brewed cup for the long evenings. Strands of Kashmiri saffron, crushed green cardamom, and a touch of cream. The chai poured into the good glassware. The chai kept for guests, weddings, and good news.',
    tastingNotes: 'Saffron, cardamom, cream, golden warmth.',
    image: productSaffron,
    imageAlt: 'Editorial still of Saffron Cardamom Gold blend with saffron strands.',
  },
];
