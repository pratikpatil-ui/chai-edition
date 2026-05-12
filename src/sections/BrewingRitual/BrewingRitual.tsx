import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { brewingSteps } from '../../data/ingredientData';
import styles from './BrewingRitual.module.css';

const stepVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const timings = ['00:30', '02:00', '03:00', '06:30', '07:30'];

function BrewingRitual() {
  return (
    <section id="ritual" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <SectionTitle
            eyebrow="ED. 06 — The Ritual"
            title="The brew is not a recipe. It is a sequence."
            kicker="Five steps, eight minutes. Watch the foam. Trust the smell. The cup tells you when it is ready."
          />
          <p className={styles.headMeta}>
            5 Steps
            <br />
            ≈ 7 — 8 min
          </p>
        </div>

        <ol className={styles.steps}>
          {brewingSteps.map((step, i) => (
            <motion.li
              key={step.step}
              className={styles.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={stepVariants}
            >
              <span className={styles.stepNum} aria-hidden="true">
                0{step.step}
              </span>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDetail}>{step.detail}</p>
              </div>
              <span className={styles.stepTime} aria-hidden="true">
                {timings[i] ?? ''}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default BrewingRitual;
