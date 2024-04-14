import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css'; 

const NotFoundPage = () => {
  return (
    <section className={styles.pageNotFound}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.centerText}>
              <div className={styles.backgroundImage}>
                <h1 className={styles.header}>404</h1>
              </div>
              <div className={styles.contentBox}>
                <h3 className={styles.subHeader}>
                  Look like you're lost
                </h3>
                <p className={styles.text}>the page you are looking for not avaible!</p>
                <div className={styles.buttonContainer}>
  <Link to="/" className={styles.homeLink}>Go to Home</Link>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;