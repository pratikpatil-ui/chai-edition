import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import MinimalHero from './sections/MinimalHero/MinimalHero';
import ScrollTransformationJourney from './sections/ScrollTransformationJourney/ScrollTransformationJourney';
import CinematicVideoInterlude from './sections/CinematicVideoInterlude/CinematicVideoInterlude';
import RegionalEditions from './sections/RegionalEditions/RegionalEditions';
import Collection from './sections/Collection/Collection';
import Colophon from './sections/Colophon/Colophon';
import CTA from './sections/CTA/CTA';
import Footer from './sections/Footer/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <ScrollProgress />
      <Header />

      <main id="main">
        <MinimalHero />
        <ScrollTransformationJourney />
        <CinematicVideoInterlude />
        <RegionalEditions />
        <Collection />
        <Colophon />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
