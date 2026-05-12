import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { journeyStages } from '../../data/journeyData';
import type { JourneyStage } from '../../types';
import styles from './ScrollTransformationJourney.module.css';

const STOPS = journeyStages.length; // 8 stages: RAW → COLLECTION REVEAL
const IMAGE_PEAK_OPACITY = 1.0; // image is the hero — no video underneath to reveal

/* ---------- Windowing ----------
 * Two envelopes per stop:
 *  - imageWindow: wider; adjacent images crossfade visibly.
 *  - textWindow:  narrower than 0.5 * span so neighbor texts never overlap.
 *
 * The first stop is held visible from progress 0;
 * the last stop is held visible to progress 1 so the transition into
 * the section beneath the track feels intentional.
 */

function imageWindow(i: number) {
  const span = 1 / STOPS;
  const center = (i + 0.5) * span;
  const halfWidth = 0.55 * span;
  const peakHalf = 0.20 * span;

  if (i === 0) {
    return { start: 0, peak: 0, peakEnd: center + peakHalf, end: center + halfWidth };
  }
  if (i === STOPS - 1) {
    return { start: center - halfWidth, peak: center - peakHalf, peakEnd: 1, end: 1 };
  }
  return {
    start: center - halfWidth,
    peak: center - peakHalf,
    peakEnd: center + peakHalf,
    end: center + halfWidth,
  };
}

function textWindow(i: number) {
  const span = 1 / STOPS;
  const center = (i + 0.5) * span;
  const halfWidth = 0.42 * span;
  const peakHalf = 0.18 * span;

  if (i === 0) {
    return { start: 0, peak: 0, peakEnd: center + peakHalf, end: center + halfWidth };
  }
  if (i === STOPS - 1) {
    return {
      start: center - halfWidth,
      peak: center - peakHalf,
      peakEnd: 0.96,
      end: 1,
    };
  }
  return {
    start: center - halfWidth,
    peak: center - peakHalf,
    peakEnd: center + peakHalf,
    end: center + halfWidth,
  };
}

interface LayerProps {
  scroll: MotionValue<number>;
  stageIndex: number;
}

function ImageLayer({
  scroll,
  stageIndex,
  image,
  alt,
  eager,
}: LayerProps & { image: string; alt: string; eager?: boolean }) {
  const w = imageWindow(stageIndex);
  const opacity = useTransform(
    scroll,
    [w.start, w.peak, w.peakEnd, w.end],
    [0, IMAGE_PEAK_OPACITY, IMAGE_PEAK_OPACITY, 0],
  );
  // Subtle pan + zoom — gives each stage a hint of life even when the
  // underlying image is shared with a neighbor.
  const scale = useTransform(
    scroll,
    [w.start, w.peak, w.peakEnd, w.end],
    [1.08, 1.0, 1.0, 1.04],
  );
  const x = useTransform(
    scroll,
    [w.start, w.peak, w.peakEnd, w.end],
    [stageIndex % 2 === 0 ? -16 : 16, 0, 0, stageIndex % 2 === 0 ? 12 : -12],
  );

  return (
    <motion.div className={styles.imgLayer} style={{ opacity }}>
      <motion.img
        src={image}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ scale, x }}
      />
    </motion.div>
  );
}

function Caption({
  scroll,
  stageIndex,
  stage,
}: LayerProps & { stage: JourneyStage }) {
  const w = textWindow(stageIndex);
  const opacity = useTransform(
    scroll,
    [w.start, w.peak, w.peakEnd, w.end],
    [0, 1, 1, 0],
  );
  // Larger y travel — guarantees that during the seam between two text
  // windows the outgoing and incoming captions are physically separated.
  const y = useTransform(
    scroll,
    [w.start, w.peak, w.peakEnd, w.end],
    [88, 0, 0, -88],
  );

  return (
    <motion.div className={styles.caption} style={{ opacity, y }}>
      <span className={styles.stageMeta}>
        <span className={styles.stageNum}>
          {String(stage.number).padStart(2, '0')}
        </span>
        <span className={styles.stageDivider} aria-hidden="true">·</span>
        <span>{stage.word}</span>
      </span>
      <p className={styles.captionText}>{stage.caption}</p>
    </motion.div>
  );
}

function ProgressRail({
  scrollFill,
  activeIndex,
}: {
  scrollFill: MotionValue<number>;
  activeIndex: number;
}) {
  return (
    <aside className={styles.rail} aria-hidden="true">
      <ol className={styles.railLabels}>
        {journeyStages.map((s, i) => (
          <li
            key={s.id}
            className={i === activeIndex ? styles.tickActive : ''}
          >
            {s.word}
          </li>
        ))}
      </ol>
      <div className={styles.railTrack}>
        <motion.div className={styles.railFill} style={{ scaleY: scrollFill }} />
      </div>
    </aside>
  );
}

function ScrollTransformationJourney() {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Smoothed scrollProgress for the saffron rail fill (avoids jitter).
  const railFill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.2,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(STOPS - 1, Math.max(0, Math.floor(v * STOPS)));
    setActiveIndex(idx);
  });

  if (reducedMotion) {
    return (
      <section
        id="journey"
        className={styles.fallback}
        aria-label="Chai transformation, from raw spice to first sip"
      >
        {journeyStages.map((s) => (
          <article key={s.id} id={s.id} className={styles.fallbackStage}>
            <img src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" />
            <div>
              <span className={styles.stageMeta}>
                <span className={styles.stageNum}>
                  {String(s.number).padStart(2, '0')}
                </span>
                <span className={styles.stageDivider} aria-hidden="true">·</span>
                <span>{s.word}</span>
              </span>
              <p className={styles.captionText}>{s.caption}</p>
            </div>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section
      id="journey"
      ref={trackRef}
      className={styles.track}
      aria-label="Chai transformation, a scroll-controlled journey from raw spice to the first sip"
    >
      <div className={styles.stage}>
        <div className={styles.canvas}>
          {journeyStages.map((s, i) => (
            <ImageLayer
              key={s.id}
              scroll={scrollYProgress}
              stageIndex={i}
              image={s.image}
              alt=""
              eager={i < 2}
            />
          ))}
        </div>

        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.steam} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.topMeta} aria-hidden="true">
          <span>Chai Edition · The Transformation</span>
          <span>Raw → Cup</span>
        </div>

        <div className={styles.captions}>
          {journeyStages.map((s, i) => (
            <Caption
              key={s.id}
              scroll={scrollYProgress}
              stageIndex={i}
              stage={s}
            />
          ))}
        </div>

        <ProgressRail scrollFill={railFill} activeIndex={activeIndex} />
      </div>

      {/* Anchor sentinels — drawer links jump straight to a stage. */}
      {journeyStages.map((s, i) => {
        const progress = (i + 0.5) / STOPS;
        return (
          <span
            key={`anchor-${s.id}`}
            id={s.id}
            className={styles.anchor}
            style={{ top: `calc(${progress} * (100% - 100vh))` }}
            aria-hidden="true"
          />
        );
      })}
    </section>
  );
}

export default ScrollTransformationJourney;
