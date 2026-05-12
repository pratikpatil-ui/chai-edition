import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import modernCafe from '../../assets/images/chai_09_modern_chai_cafe.jpg';
import styles from './Colophon.module.css';

const specs: { label: string; value: ReactNode }[] = [
  { label: 'Issue', value: 'Vol. 01 · First Digital Issue' },
  { label: 'Subject', value: 'Indian chai culture, brewed across regions' },
  { label: 'Editor & Builder', value: 'A full-stack and React Native developer who refuses to skip his morning cup' },
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
            <blockquote className={styles.pullquote}>
              <p>
                “I wanted it to feel like a magazine you read with a cup in
                hand. Every scroll, a new edition of the chai I grew up loving.”
              </p>
            </blockquote>
            <p className={styles.body}>
              Chai Edition began as a personal love note to a drink I have
              watched simmer on the stove since I was small. The frontend is
              React and TypeScript, built clean and quiet. The imagery is
              AI-assisted, but every word, every cup, every framing, every line
              of code, and every late-night polish is mine.
            </p>
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
            alt="A contemporary chai café, warm wood, low light, and a single cup of chai catching the glow."
            loading="lazy"
            decoding="async"
          />
          <span className={styles.featureScrim} aria-hidden="true" />
          <figcaption className={styles.featureCopy}>
            <span className={styles.featureEyebrow}>Closing Spread</span>
            <p className={styles.featureTitle}>
              The same ritual, brought into a quieter room. Old chai, new edition.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default Colophon;
