import type { Edition, NavLink } from '../types';

import railwayCutting from '../assets/images/chai_02_railway_cutting.jpg';
import kulhad from '../assets/images/chai_03_kulhad_chai.jpg';
import masalaIngredients from '../assets/images/chai_04_masala_ingredients.jpg';
import gingerBrewing from '../assets/images/chai_05_ginger_brewing.jpg';
import saffronCardamom from '../assets/images/chai_06_saffron_cardamom.jpg';
import brewingRitual from '../assets/images/chai_07_brewing_ritual.jpg';

export const editions: Edition[] = [
  {
    id: 'ed-00',
    label: 'ED. 00 — The Pour',
    title: 'The Pour',
    text: 'Every cup of chai begins with a pause — the sound of boiling milk, crushed spices, rising steam, and a familiar warmth.',
    image: masalaIngredients,
    imageAlt: 'Crushed cardamom, cinnamon, and cloves arranged on a warm surface.',
  },
  {
    id: 'ed-01',
    label: 'ED. 01 — Mumbai Cutting',
    title: 'Mumbai Cutting',
    text: 'Sharp, sweet, and energetic, cutting chai carries the rhythm of local trains, office breaks, street corners, and quick conversations.',
    image: railwayCutting,
    imageAlt: 'Small glasses of strong, milky cutting chai on a Mumbai railway platform.',
  },
  {
    id: 'ed-02',
    label: 'ED. 02 — Banaras Adrak',
    title: 'Banaras Adrak',
    text: 'Ginger-led chai brings heat, clarity, and comfort. It is strong, direct, and deeply rooted in everyday Indian mornings.',
    image: gingerBrewing,
    imageAlt: 'Fresh ginger and tea leaves steeping in a small steel pan.',
  },
  {
    id: 'ed-03',
    label: 'ED. 03 — Kashmir Kahwa',
    title: 'Kashmir Kahwa',
    text: 'Saffron, cardamom, almonds, and warmth come together in a more delicate expression of tea culture.',
    image: saffronCardamom,
    imageAlt: 'Golden kahwa with saffron strands and slivered almonds in a porcelain cup.',
  },
  {
    id: 'ed-04',
    label: 'ED. 04 — Kulhad Smoke',
    title: 'Kulhad Smoke',
    text: 'Served in clay, kulhad chai carries an earthy aroma that makes the drink feel nostalgic before the first sip.',
    image: kulhad,
    imageAlt: 'Clay kulhad cups filled with steaming chai resting on a wooden surface.',
  },
  {
    id: 'ed-05',
    label: 'ED. 05 — Saffron Cardamom',
    title: 'Saffron Cardamom',
    text: 'A richer, festive chai expression that feels luxurious while staying connected to Indian hospitality.',
    image: saffronCardamom,
    imageAlt: 'Saffron strands and green cardamom pods beside a warm cup of chai.',
  },
  {
    id: 'ed-06',
    label: 'ED. 06 — The Ritual',
    title: 'The Ritual',
    text: 'The best chai is not rushed. It is watched, adjusted, boiled, tasted, and perfected by instinct.',
    image: brewingRitual,
    imageAlt: 'Chai simmering in a small pan with steam rising into warm light.',
  },
];

export const navLinks: NavLink[] = [
  { label: 'ED. 00 — The Pour', href: '#ed-00' },
  { label: 'ED. 01 — Mumbai Cutting', href: '#ed-01' },
  { label: 'ED. 02 — Banaras Adrak', href: '#ed-02' },
  { label: 'ED. 03 — Kashmir Kahwa', href: '#ed-03' },
  { label: 'ED. 04 — Kulhad Smoke', href: '#ed-04' },
  { label: 'ED. 05 — Saffron Cardamom', href: '#ed-05' },
  { label: 'ED. 06 — The Ritual', href: '#ed-06' },
  { label: 'ED. 07 — The Collection', href: '#collection' },
  { label: 'Colophon', href: '#colophon' },
];
