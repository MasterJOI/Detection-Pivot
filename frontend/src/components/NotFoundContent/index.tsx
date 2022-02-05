import React from 'react';
import styles from './styles.module.scss';

interface INotFoundContent {
  description: string;
}

const NotFoundContent: React.FC<INotFoundContent> = (
  {
    description
  }
) => (
  <div className={styles.emptyContent}>
    <p className={styles.emptyLabel}>
      {description}
    </p>
  </div>
);

export default NotFoundContent;
