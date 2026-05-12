import { motion } from 'framer-motion';
import { culturalEditions } from '../../data/journeyData';
import styles from './RegionalEditions.module.css';

const copyVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const frameVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function RegionalEditions() {
  return (
    <section id="editions" className={styles.section} aria-label="Chai editions">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <span className={styles.eyebrow}>The Editions</span>
            <h2 className={styles.title}>Five chapters. One drink.</h2>
            <p className={styles.kicker}>
              The making is the same. The story changes with every region it
              travels through, every kitchen it learns, every season it survives.
            </p>
          </div>
          <p className={styles.meta}>
            ED. 01 · ED. 05
            <br />
            Cultural Chapters
          </p>
        </div>

        <div className={styles.chapters}>
          {culturalEditions.map((edition, i) => {
            const reverse = i % 2 === 1;
            const number = String(i + 1).padStart(2, '0');
            return (
              <article
                key={edition.id}
                id={edition.id}
                className={`${styles.chapter} ${reverse ? styles.chapterReverse : ''}`}
              >
                <motion.div
                  className={styles.copy}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={copyVariants}
                >
                  <span className={styles.chapterMeta}>
                    <span className={styles.chapterNum}>ED. {number}</span>
                    <span className={styles.chapterDivider} aria-hidden="true">·</span>
                    <span className={styles.chapterRegion}>{edition.region}</span>
                  </span>
                  <h3 className={styles.chapterName}>{edition.name}</h3>
                  <p className={styles.chapterCue}>{edition.cue}</p>
                  <span className={styles.chapterFootline}>
                    Cultural Chapter · 2026
                  </span>
                </motion.div>

                <motion.div
                  className={styles.frame}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={frameVariants}
                >
                  <img
                    className={styles.image}
                    src={edition.image}
                    alt={edition.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RegionalEditions;
