import { motion } from 'framer-motion';
import { hero } from '../../data/journeyData';
import heroPoster from '../../assets/images/chai_01_hero_cinematic.jpg';
import styles from './MinimalHero.module.css';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function MinimalHero() {
  return (
    <section id="cover" className={styles.hero} aria-label="Chai Edition, the cover">
      {/* Static cinematic still as mood — no video here. Video is reserved
          for the CinematicVideoInterlude after the transformation journey. */}
      <div className={styles.media} aria-hidden="true">
        <img
          className={styles.poster}
          src={heroPoster}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className={styles.mediaScrim} />
      </div>

      <div className="container">
        <motion.div
          className={styles.inner}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span
            className={styles.rule}
            variants={item}
            aria-hidden="true"
          />
          <motion.span className={styles.meta} variants={item}>
            {hero.meta}
          </motion.span>
          <motion.h1 className={styles.brand} variants={item}>
            Chai <em>Edition</em>
          </motion.h1>
          <motion.p className={styles.tagline} variants={item}>
            {hero.tagline}
          </motion.p>
          <motion.p className={styles.supporting} variants={item}>
            {hero.supporting}
          </motion.p>
          <motion.span className={styles.hint} variants={item}>
            {hero.hint}
          </motion.span>
        </motion.div>
      </div>

      <span className={styles.corner} aria-hidden="true">
        Eight stages
      </span>
    </section>
  );
}

export default MinimalHero;
