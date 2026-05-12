import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../../assets/images/chai-edition-logo.png';
import styles from './Header.module.css';

const navItems = [
  { label: 'The Transformation', href: '#journey' },
  { label: 'Interlude', href: '#interlude' },
  { label: 'The Editions', href: '#editions' },
  { label: 'The Collection', href: '#collection' },
  { label: 'Colophon', href: '#colophon' },
];

const drawerItems = [
  { label: 'Cover · Begin the ritual', href: '#cover' },
  { label: 'Stage 01 · Raw', href: '#stage-raw' },
  { label: 'Stage 02 · Crush', href: '#stage-crush' },
  { label: 'Stage 03 · Heat', href: '#stage-heat' },
  { label: 'Stage 04 · Brew', href: '#stage-brew' },
  { label: 'Stage 05 · Simmer', href: '#stage-simmer' },
  { label: 'Stage 06 · Pour', href: '#stage-pour' },
  { label: 'Stage 07 · Serve · Sip', href: '#stage-serve' },
  { label: 'Stage 08 · The Collection Reveal', href: '#stage-collection' },
  { label: 'Cinematic Interlude', href: '#interlude' },
  { label: 'The Editions', href: '#editions' },
  { label: 'The Collection', href: '#collection' },
  { label: 'Colophon', href: '#colophon' },
];

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
          <a href="#cover" className={styles.brand} aria-label="Go to Chai Edition home">
            <img
              src={logo}
              alt="Chai Edition logo"
              className={styles.brandLogo}
              width={36}
              height={36}
              decoding="async"
            />
            <span className={styles.brandText}>
              Chai <em>Edition</em>
            </span>
          </a>

          <span className={styles.metaCenter} aria-hidden="true">
            VOL. 01 · DIGITAL ISSUE
          </span>

          <nav className={styles.nav} aria-label="Primary sections">
            {navItems.map((item) => (
              <a key={item.href} className={styles.navLink} href={item.href}>
                {item.label}
              </a>
            ))}
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
              {drawerItems.map((link, idx) => (
                <motion.li
                  key={link.href + idx}
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
