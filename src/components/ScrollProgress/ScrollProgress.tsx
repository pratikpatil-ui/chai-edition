import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.2,
  });

  return (
    <div className={styles.bar} aria-hidden="true">
      <motion.span className={styles.fill} style={{ scaleX }} />
    </div>
  );
}

export default ScrollProgress;
