import { useEffect, useRef, useState } from 'react';
import posterImage from '../../assets/images/chai_01_hero_cinematic.jpg';
import cinematicLoop from '../../assets/videos/video_01_pour_to_ritual.mp4';
import styles from './VideoBackground.module.css';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCoarsePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(max-width: 720px)').matches;
}

function VideoBackground() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    setShouldPlay(!prefersReducedMotion() && !isCoarsePointer());
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !shouldPlay) return;

    const onCanPlay = () => setReady(true);
    node.addEventListener('canplay', onCanPlay, { once: true });

    const playPromise = node.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay blocked — poster stays visible, no UI fallback needed.
      });
    }

    return () => node.removeEventListener('canplay', onCanPlay);
  }, [shouldPlay]);

  return (
    <div className={styles.shell} aria-hidden="true">
      <img
        className={styles.poster}
        src={posterImage}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      {shouldPlay ? (
        <video
          ref={ref}
          className={styles.video}
          data-ready={ready}
          poster={posterImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={cinematicLoop} type="video/mp4" />
        </video>
      ) : null}
      <div className={styles.scrim} />
      <div className={styles.grain} />
    </div>
  );
}

export default VideoBackground;
