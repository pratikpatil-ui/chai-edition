import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import VideoBackground from './components/VideoBackground/VideoBackground';
import Hero from './sections/Hero/Hero';
import Editions from './sections/Editions/Editions';
import FieldNotes from './sections/FieldNotes/FieldNotes';
import BrewingRitual from './sections/BrewingRitual/BrewingRitual';
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
      <VideoBackground />
      <ScrollProgress />
      <Header />

      <main id="main">
        <Hero />
        <Editions />
        <FieldNotes />
        <BrewingRitual />
        <Collection />
        <Colophon />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default App;
