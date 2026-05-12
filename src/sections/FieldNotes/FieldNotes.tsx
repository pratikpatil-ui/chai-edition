import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { ingredients } from '../../data/ingredientData';
import styles from './FieldNotes.module.css';

const cellVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
};

function FieldNotes() {
  return (
    <section id="field-notes" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.head}>
            <SectionTitle
              eyebrow="Field Notes"
              title="Ingredients, kept honest."
              kicker="Eight ingredients, one cup. Nothing exotic, everything intentional — measured by instinct, not script."
            />
            <p className={styles.aside}>
              The order matters: aroma first, heat second, milk last. Crushed in a mortar,
              never powdered. This is how the cup carries weight without tasting heavy.
            </p>
          </div>

          <div className={styles.grid}>
            {ingredients.map((ingredient, i) => (
              <motion.div
                key={ingredient.id}
                className={styles.cell}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={cellVariants}
              >
                <span className={styles.cellNum}>
                  No. {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.cellName}>{ingredient.name}</h3>
                <p className={styles.cellNote}>{ingredient.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FieldNotes;
