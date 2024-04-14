import React from 'react';
import styles from './Loading.module.css'; 
function Loading() {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderInner + ' ' + styles.pacman}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;