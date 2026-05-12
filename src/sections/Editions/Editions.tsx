import EditionCard from '../../components/EditionCard/EditionCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { editions } from '../../data/editionData';
import styles from './Editions.module.css';

function Editions() {
  return (
    <section id="editions" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <SectionTitle
            eyebrow="The Editions"
            title="Seven editions of one obsession."
            kicker="Each chapter is a region, a ritual, or a moment — written like a film, brewed like a memory."
          />
          <p className={styles.headMeta}>
            ED. 00 — ED. 06
            <br />
            Field Edition · 2026
          </p>
        </div>

        <div className={styles.list}>
          {editions.map((edition, index) => (
            <EditionCard key={edition.id} edition={edition} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Editions;
