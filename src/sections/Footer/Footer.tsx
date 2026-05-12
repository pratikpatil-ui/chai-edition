import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.brand}>Chai <em>Edition</em></p>
            <p className={styles.tagline}>India, brewed in editions.</p>
          </div>

          <div className={styles.col}>
            <span className={styles.colHead}>The Edition</span>
            <a className={styles.link} href="#editions">All Editions</a>
            <a className={styles.link} href="#field-notes">Field Notes</a>
            <a className={styles.link} href="#ritual">The Ritual</a>
            <a className={styles.link} href="#collection">The Collection</a>
            <a className={styles.link} href="#colophon">Colophon</a>
          </div>

          <div className={styles.col}>
            <span className={styles.colHead}>Project</span>
            <a
              className={styles.link}
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className={styles.link}
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a className={styles.link} href="#top">Back to the Cover</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.smallText}>
            Built with React, Vite, TypeScript, Framer Motion, AI-assisted visuals, GitHub,
            and Vercel.
          </p>
          <span className={styles.copy}>© {year} · Chai Edition</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
