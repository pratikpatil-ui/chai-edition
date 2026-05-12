import type { BrewingStep, Ingredient } from '../types';

export const ingredients: Ingredient[] = [
  {
    id: 'assam',
    name: 'Assam Tea Leaves',
    note: 'Strong, malty base that carries milk and spice without thinning.',
  },
  {
    id: 'ginger',
    name: 'Ginger',
    note: 'Crushed fresh — heat, clarity, and a clean finish.',
  },
  {
    id: 'cardamom',
    name: 'Cardamom',
    note: 'Green pods, lightly bruised. Floral lift, signature aroma.',
  },
  {
    id: 'cinnamon',
    name: 'Cinnamon',
    note: 'A single stick. Quiet sweetness, not perfume.',
  },
  {
    id: 'cloves',
    name: 'Cloves',
    note: 'Two or three. Depth, warmth, a slow finish.',
  },
  {
    id: 'saffron',
    name: 'Saffron',
    note: 'A few strands for kahwa or festive cups. Golden warmth.',
  },
  {
    id: 'milk',
    name: 'Milk',
    note: 'Full-fat, brought to a slow simmer — never a hard boil.',
  },
  {
    id: 'sugar',
    name: 'Jaggery or Sugar',
    note: 'To taste. Jaggery gives a rounder, caramel-soft sweetness.',
  },
];

export const brewingSteps: BrewingStep[] = [
  {
    step: 1,
    title: 'Crush the spices',
    detail: 'Lightly crack cardamom, ginger, and cloves in a mortar to release the oils.',
  },
  {
    step: 2,
    title: 'Boil water and tea leaves',
    detail: 'Bring water to a gentle boil, then add the leaves and watch the colour deepen.',
  },
  {
    step: 3,
    title: 'Add ginger and milk',
    detail: 'Stir in crushed ginger first, then milk. The pan should foam, not roar.',
  },
  {
    step: 4,
    title: 'Simmer slowly',
    detail: 'Hold at a soft simmer for three to four minutes. This is the patience step.',
  },
  {
    step: 5,
    title: 'Strain and serve hot',
    detail: 'Pour through a fine strainer into a warmed cup. Drink while the steam is still rising.',
  },
];
