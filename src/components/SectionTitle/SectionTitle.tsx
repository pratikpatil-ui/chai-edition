import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  kicker?: string;
  as?: 'h2' | 'h3';
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function SectionTitle({ eyebrow, title, kicker, as = 'h2' }: SectionTitleProps) {
  const Heading = as;
  return (
    <motion.div
      className={styles.wrap}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={reveal}
    >
      <span className={styles.rule} aria-hidden="true" />
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <Heading className={styles.title}>{title}</Heading>
      {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
    </motion.div>
  );
}

export default SectionTitle;
