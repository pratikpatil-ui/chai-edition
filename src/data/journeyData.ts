import type { CulturalEdition, JourneyStage } from '../types';

// Editorial/culture images (real assets on disk)
import chai01 from '../assets/images/chai_01_hero_cinematic.jpg';
import chai02 from '../assets/images/chai_02_railway_cutting.jpg';
import chai03 from '../assets/images/chai_03_kulhad_chai.jpg';
import chai04 from '../assets/images/chai_04_masala_ingredients.jpg';
import chai05 from '../assets/images/chai_05_ginger_brewing.jpg';
import chai06 from '../assets/images/chai_06_saffron_cardamom.jpg';
import chai07 from '../assets/images/chai_07_brewing_ritual.jpg';
import chai08 from '../assets/images/chai_08_editorial_collection.jpg';
import chai09 from '../assets/images/chai_09_modern_chai_cafe.jpg';

/**
 * Stage images per the spec map to dedicated stage_NN_*.png assets.
 * Those files don't exist yet; the imports below use the user's documented
 * fallback mapping until the real stage assets are added. When you drop the
 * real PNGs into src/assets/images/, just change the import targets here.
 */
const STAGE_RAW = chai04;                  // → stage_01_raw_ingredients.png
const STAGE_CRUSH = chai04;                // → stage_02_spices_crushed.png
const STAGE_HEAT = chai07;                 // → stage_03_brewing_pot.png
const STAGE_BREW = chai05;                 // → stage_04_boiling_chai.png
const STAGE_SIMMER = chai01;               // → stage_05_steam_rising.png
const STAGE_POUR = chai06;                 // → stage_06_pouring_chai.png
const STAGE_SERVE = chai03;                // → stage_07_final_cup.png
const STAGE_COLLECTION = chai08;           // → stage_08_collection_reveal.png

export const hero = {
  meta: 'VOL. 01 · A CINEMATIC DIGITAL MAGAZINE',
  brand: 'Chai Edition',
  tagline: 'India, brewed in editions.',
  supporting:
    'A digital magazine for the drink that holds India together one steaming cup at a time. Through the making. Through the memory. Through the first slow sip.',
  hint: 'Scroll · The kettle is already on',
};

/**
 * 8 transformation stages — image-driven, no video.
 * RAW → CRUSH → HEAT → BREW → SIMMER → POUR → SERVE/SIP → COLLECTION REVEAL
 */
export const journeyStages: JourneyStage[] = [
  {
    id: 'stage-raw',
    number: 1,
    word: 'Raw',
    caption:
      'A pinch of Assam leaves. A knot of ginger. Green cardamom, clove, a curl of cinnamon. Every Indian morning starts here, quietly, on the counter.',
    image: STAGE_RAW,
    imageAlt:
      'Raw chai ingredients laid out on a warm dark surface before preparation begins.',
  },
  {
    id: 'stage-crush',
    number: 2,
    word: 'Crush',
    caption:
      'Ginger bruised in the palm. Cardamom cracked open with the back of a spoon. The kitchen already knows what is coming.',
    image: STAGE_CRUSH,
    imageAlt:
      'Crushed ginger and warming spices catching the light, aroma being released.',
  },
  {
    id: 'stage-heat',
    number: 3,
    word: 'Heat',
    caption:
      'Water meets flame in a small steel pan. Dark leaves begin to bloom. The rest of the morning agrees to slow down.',
    image: STAGE_HEAT,
    imageAlt:
      'A brass pot warming over flame, water starting to tremble around dark tea leaves.',
  },
  {
    id: 'stage-brew',
    number: 4,
    word: 'Brew',
    caption:
      'Milk folds in. Spice opens up. The colour turns slow gold. This is the moment that smells like every house you have ever loved.',
    image: STAGE_BREW,
    imageAlt:
      'Tea, milk, and spices folding together as the chai turns rich and amber.',
  },
  {
    id: 'stage-simmer',
    number: 5,
    word: 'Simmer',
    caption:
      'Good chai refuses to be hurried. It rises, it settles, it rises again. You wait, and somehow that waiting is already comfort.',
    image: STAGE_SIMMER,
    imageAlt:
      'Steam rising slowly from a simmering pan of chai under warm low light.',
  },
  {
    id: 'stage-pour',
    number: 6,
    word: 'Pour',
    caption:
      'Stretched high from the kettle, the chai falls in a long, fragrant ribbon. The craving you have been carrying all morning finally has a name.',
    image: STAGE_POUR,
    imageAlt:
      'Chai being poured into a glass, the first wave of aroma meeting cold air.',
  },
  {
    id: 'stage-serve',
    number: 7,
    word: 'Serve · Sip',
    caption:
      'A warm glass against cold fingers. The first sip lands and the whole house exhales with you. This is the quietest, loudest moment of the day.',
    image: STAGE_SERVE,
    imageAlt:
      'A steaming cup of chai held close, comfort and warmth, the moment before the first sip.',
  },
  {
    id: 'stage-collection',
    number: 8,
    word: 'Collection',
    caption:
      'Every cup carries a memory. Three of them, we chose to bottle.',
    image: STAGE_COLLECTION,
    imageAlt:
      'A premium editorial composition of Chai Edition blends, the cup, now named.',
  },
];

/**
 * Cultural editions — light reveal section AFTER the cinematic video interlude.
 * Image-led, almost no copy. Read as five short magazine chapters.
 */
export const culturalEditions: CulturalEdition[] = [
  {
    id: 'mumbai-cutting',
    region: 'Mumbai',
    name: 'Cutting Chai',
    cue: 'Half a glass, twice the heart. The fuel of a city that never sits down.',
    image: chai02,
    imageAlt:
      'Small cutting-chai glasses on a Mumbai railway platform, steam rising.',
  },
  {
    id: 'banaras-adrak',
    region: 'Banaras',
    name: 'Adrak Chai',
    cue: 'Brewed sharp with ginger by the ghats. A cup for cold mornings, long silences, and longer conversations.',
    image: chai05,
    imageAlt: 'Fresh ginger and tea leaves brewing in a small steel pan.',
  },
  {
    id: 'kulhad-smoke',
    region: 'Roadside',
    name: 'Kulhad Smoke',
    cue: 'Poured into raw terracotta, sipped once, then returned to the earth. The clay itself becomes a flavour.',
    image: chai03,
    imageAlt: 'Clay kulhad cups filled with steaming chai.',
  },
  {
    id: 'saffron-cardamom',
    region: 'Kashmir to Kitchen',
    name: 'Saffron Cardamom',
    cue: 'Threads of Kashmiri saffron. Crushed green cardamom. The cup that comes out for guests, festivals, and good news.',
    image: chai06,
    imageAlt:
      'Saffron threads and green cardamom around a warm cup of festive chai.',
  },
  {
    id: 'modern-chai',
    region: 'Today',
    name: 'Modern Chai Culture',
    cue: 'Slow wood, soft light, a quieter playlist. The kettle has moved indoors. The ritual has not changed at all.',
    image: chai09,
    imageAlt:
      'A contemporary chai cafe, warm wood, low light, a single cup catching the glow.',
  },
];
