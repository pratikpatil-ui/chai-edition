import type { Product } from '../types';

import productMasala from '../assets/images/product_01_masala_chai.jpg';
import productKulhad from '../assets/images/product_02_kulhad_chai.jpg';
import productSaffron from '../assets/images/product_03_saffron_cardamom_chai.jpg';

export const products: Product[] = [
  {
    id: 'masala-reserve',
    name: 'Masala Chai Reserve',
    description: 'Bold black tea with warming spices for a strong everyday cup.',
    tastingNotes: 'Ginger, cardamom, cinnamon, full-bodied tea.',
    image: productMasala,
    imageAlt: 'Editorial still of Masala Chai Reserve packaging on a warm dark surface.',
  },
  {
    id: 'kulhad-street',
    name: 'Kulhad Street Blend',
    description:
      'A rustic blend inspired by roadside stalls, railway platforms, and clay-cup chai.',
    tastingNotes: 'Earthy, smoky, nostalgic, strong.',
    image: productKulhad,
    imageAlt: 'Editorial still of Kulhad Street Blend with clay cup composition.',
  },
  {
    id: 'saffron-gold',
    name: 'Saffron Cardamom Gold',
    description: 'A premium festive blend with saffron warmth and cardamom aroma.',
    tastingNotes: 'Saffron, cardamom, cream, golden warmth.',
    image: productSaffron,
    imageAlt: 'Editorial still of Saffron Cardamom Gold blend with saffron strands.',
  },
];
