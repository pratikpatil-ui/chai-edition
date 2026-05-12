import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function Hero() {
  return (
    <section id="top" className={styles.hero} aria-label="Chai Edition cover">
      <div className="container">
        <motion.div
          className={styles.inner}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div className={styles.top} variants={item}>
            <span className={styles.topRule} aria-hidden="true" />
            <span className={styles.topLabel}>
              VOL. 01 / INDIAN CHAI CULTURE / DIGITAL EDITION
            </span>
          </motion.div>

          <motion.h1 className={styles.brand} variants={item}>
            Chai <em>Edition</em>
          </motion.h1>

          <motion.p className={styles.tagline} variants={item}>
            India, brewed in editions.
          </motion.p>

          <motion.p className={styles.supporting} variants={item}>
            A cinematic digital magazine exploring Indian chai through regional stories,
            brewing rituals, warm visuals, and a personal love for the perfect cup.
          </motion.p>

          <motion.div className={styles.meta} variants={item} aria-hidden="true">
            <span>First Digital Issue</span>
            <span className={styles.metaDot} />
            <span>Seven Editions</span>
            <span className={styles.metaDot} />
            <span>One Ritual</span>
          </motion.div>

          <motion.div className={styles.ctaRow} variants={item}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#editions">
              Read the Edition
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#colophon">
              View the Colophon
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll · Begin the Pour</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default Hero;
