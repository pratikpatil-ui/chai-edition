import { motion } from 'framer-motion';
import type { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.article
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
    >
      <span className={styles.index} aria-hidden="true">
        № {String(index + 1).padStart(2, '0')}
      </span>
      <div className={styles.frame}>
        <img
          className={styles.image}
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>The Collection</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.notesWrap}>
          <span className={styles.notesLabel}>Tasting Notes</span>
          <p className={styles.notes}>{product.tastingNotes}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
