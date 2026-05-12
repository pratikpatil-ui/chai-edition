import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import poster from '../../assets/images/chai_01_hero_cinematic.jpg';
import loopWebm from '../../assets/videos/chai_edition_cinematic_loop.webm';
import loopMp4 from '../../assets/videos/chai_edition_cinematic_loop.mp4';
import styles from './CinematicVideoInterlude.module.css';

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function CinematicVideoInterlude() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  // Autoplay the cinematic montage once metadata is ready.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);
    video.addEventListener('canplay', onReady, { once: true });

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay blocked — the poster carries the visual.
      });
    }
    return () => video.removeEventListener('canplay', onReady);
  }, [reducedMotion]);

  // Pause when out of view — saves battery once the visitor moves on.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* still blocked — fine. */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="interlude"
      className={styles.interlude}
      aria-label="A cinematic pause before the chai editions"
    >
      <div className={styles.media} aria-hidden="true">
        <img
          className={styles.poster}
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
        />
        {reducedMotion ? null : (
          <video
            ref={videoRef}
            className={styles.video}
            data-ready={ready}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            poster={poster}
          >
            <source src={loopWebm} type="video/webm" />
            <source src={loopMp4} type="video/mp4" />
          </video>
        )}
        <div className={styles.scrim} />
      </div>

      <div className={styles.copy}>
        <motion.div
          className={styles.copyInner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
        >
          <span className={styles.eyebrow}>The Interlude</span>
          <p className={styles.caption}>
            Somewhere between the boil and the pour, chai stops being a drink. It
            quietly becomes a daily way of belonging to the people around you.
          </p>
          <span className={styles.meta}>Pause · Feel · Continue</span>
        </motion.div>
      </div>
    </section>
  );
}

export default CinematicVideoInterlude;
