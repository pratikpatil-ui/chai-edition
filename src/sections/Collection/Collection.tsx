import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { products } from '../../data/productData';
import collectionBanner from '../../assets/images/chai_08_editorial_collection.jpg';
import styles from './Collection.module.css';

const bannerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function Collection() {
  return (
    <section id="collection" className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <SectionTitle
            eyebrow="The Final Reveal"
            title="Now the cup has a name."
            kicker="After the steam, after the pour, three blends arrive on the shelf. The same warmth, held in three different memories of it."
          />
          <p className={styles.headMeta}>
            № 01 · № 03
            <br />
            Editorial Collection
          </p>
        </div>

        <motion.figure
          className={styles.banner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={bannerVariants}
        >
          <img
            className={styles.bannerImage}
            src={collectionBanner}
            alt="An editorial flat-lay of Chai Edition blends, masala, kulhad, and saffron cardamom, composed on a warm dark surface."
            loading="lazy"
            decoding="async"
          />
          <span className={styles.bannerScrim} aria-hidden="true" />
          <figcaption className={styles.bannerCopy}>
            <span className={styles.bannerEyebrow}>The Shelf</span>
            <p className={styles.bannerTitle}>
              The making is done. The pouring is done. All that is left is the
              cup, and the small, soft quiet that always follows.
            </p>
          </figcaption>
        </motion.figure>

        <div className={styles.grid}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collection;
