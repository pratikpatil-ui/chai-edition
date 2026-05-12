import { motion } from 'framer-motion';
import type { Edition } from '../../types';
import styles from './EditionCard.module.css';

interface EditionCardProps {
  edition: Edition;
  index: number;
}

const copyVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

const frameVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
};

function EditionCard({ edition, index }: EditionCardProps) {
  const reverse = index % 2 === 1;

  return (
    <article
      id={edition.id}
      className={`${styles.card} ${reverse ? styles.cardReverse : ''}`}
    >
      <motion.div
        className={styles.copy}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={copyVariants}
      >
        <span className={styles.label}>{edition.label}</span>
        <h3 className={styles.title}>{edition.title}</h3>
        <p className={styles.text}>{edition.text}</p>
        <div className={styles.aside} aria-hidden="true">
          <span className={styles.asideRule} />
          <span>Field Edition · 2026</span>
        </div>
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
}

export default EditionCard;
