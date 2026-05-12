import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import modernCafe from '../../assets/images/chai_09_modern_chai_cafe.jpg';
import styles from './Colophon.module.css';

const specs: { label: string; value: ReactNode }[] = [
  { label: 'Issue', value: 'Vol. 01 — First Digital Issue' },
  { label: 'Subject', value: 'Indian chai culture, regional editions' },
  { label: 'Editor & Builder', value: 'A full-stack & React Native developer' },
  { label: 'Stack', value: 'React · Vite · TypeScript · Framer Motion' },
  { label: 'Visuals', value: <>AI-assisted, <em>art-directed by hand</em></> },
  { label: 'Hosting', value: 'Vercel · GitHub' },
  { label: 'Year', value: '2026' },
];

const featureVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
};

function Colophon() {
  return (
    <section id="colophon" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <SectionTitle
              eyebrow="Colophon"
              title="Built as a digital edition."
            />
            <p className={styles.body}>
              Chai Edition was created as an AI-assisted frontend portfolio project combining
              personal storytelling, Indian chai culture, AI-generated visuals, React,
              TypeScript, motion design, accessibility, performance awareness, GitHub, and
              Vercel deployment.
            </p>
            <p className={styles.body}>
              AI accelerated visuals and scaffolding. The concept, naming, art direction,
              prompts, frontend architecture, accessibility checks, performance work, and
              deployment workflow were owned personally.
            </p>
            <blockquote className={styles.pullquote}>
              <p>
                “I designed it like a cinematic digital magazine, where each scroll section
                is an edition of Indian chai culture.”
              </p>
            </blockquote>
          </div>

          <div className={styles.specs}>
            {specs.map((row) => (
              <div className={styles.row} key={row.label}>
                <span className={styles.rowLabel}>{row.label}</span>
                <span className={styles.rowValue}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.figure
          className={styles.feature}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={featureVariants}
        >
          <img
            className={styles.featureImage}
            src={modernCafe}
            alt="A contemporary chai café — warm wood, low light, and a single cup of chai catching the glow."
            loading="lazy"
            decoding="async"
          />
          <span className={styles.featureScrim} aria-hidden="true" />
          <figcaption className={styles.featureCopy}>
            <span className={styles.featureEyebrow}>Closing Spread</span>
            <p className={styles.featureTitle}>
              The same ritual, in a modern room. Old chai, new edition.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default Colophon;
