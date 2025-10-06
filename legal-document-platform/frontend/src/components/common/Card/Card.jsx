import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, hoverable, onClick, style, className }) => {
  const cardClasses = [
    styles.card,
    hoverable ? styles.hoverable : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
