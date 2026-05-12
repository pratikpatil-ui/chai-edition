import { motion } from 'framer-motion';
import styles from './CTA.module.css';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function CTA() {
  return (
    <section id="cta" className={styles.section} aria-label="Project links">
      <div className="container">
        <motion.div
          className={styles.inner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
        >
          <span className={styles.eyebrow}>Closing Edition</span>
          <h2 className={styles.title}>
            A personal ritual, shaped into a <em>digital product.</em>
          </h2>
          <p className={styles.body}>
            This project turns a real personal interest into a premium editorial frontend
            experience.
          </p>
          <div className={styles.row}>
            <a
              className={`${styles.btn} ${styles.btnPrimary}`}
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub
            </a>
            <a
              className={styles.btn}
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
