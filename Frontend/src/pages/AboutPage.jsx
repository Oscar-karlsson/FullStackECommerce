import React from 'react';
import styles from './AboutPage.module.css';

const About = () => {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Om Oss</h1>
        <p className={styles.text}>Vi är ett ledande e-handelsföretag som specialiserar oss på teknikprodukter. Vår mission är att erbjuda de senaste och bästa teknikprodukterna till konkurrenskraftiga priser.</p>
        <h2 className={styles.subtitle}>Vår Historia</h2>
        <p className={styles.text}>Vi startade vår resa i 2010 med en passion för teknik och en vision om att bli den bästa platsen för teknikentusiaster att hitta de produkter de älskar. Sedan dess har vi vuxit till att bli en av de mest betrodda e-handelsplatserna för teknikprodukter.</p>
        <h2 className={styles.subtitle}>Vårt Team</h2>
        <p className={styles.text}>Vårt team består av dedikerade teknikentusiaster som arbetar hårt för att ge dig den bästa shoppingupplevelsen. Vi är stolta över vårt team och den passion de har för de produkter vi säljer.</p>
        <h2 className={styles.subtitle}>Vår Kundservice</h2>
        <p className={styles.text}>Vår kundservice är alltid här för att hjälpa dig med alla dina frågor och funderingar. Vi värdesätter våra kunder och strävar efter att alltid erbjuda den bästa möjliga shoppingupplevelsen.</p>
        <p className={styles.text}>Tack för att du väljer oss för dina teknikbehov. Vi ser fram emot att tjäna dig.</p>
      </div>
    );
  };

export default About;