import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../../data/editionData';
import styles from './Header.module.css';

function Header() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.bar}`}>
          <a href="#top" className={styles.brand} aria-label="Chai Edition — home">
            <span>Chai <em>Edition</em></span>
          </a>

          <span className={styles.metaCenter} aria-hidden="true">
            VOL. 01 · DIGITAL ISSUE
          </span>

          <nav className={styles.nav} aria-label="Edition sections">
            <a className={styles.navLink} href="#editions">Editions</a>
            <a className={styles.navLink} href="#field-notes">Field Notes</a>
            <a className={styles.navLink} href="#ritual">Ritual</a>
            <a className={styles.navLink} href="#collection">Collection</a>
            <a className={styles.navLink} href="#colophon">Colophon</a>
          </nav>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={open}
            aria-controls="edition-nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Index'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="edition-nav-drawer"
            key="drawer"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Edition navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.drawerList}>
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + idx * 0.04 }}
                >
                  <a href={link.href} className={styles.drawerLink} onClick={close}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className={styles.drawerMeta}>
              VOL. 01 / INDIAN CHAI CULTURE / DIGITAL EDITION
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Header;
