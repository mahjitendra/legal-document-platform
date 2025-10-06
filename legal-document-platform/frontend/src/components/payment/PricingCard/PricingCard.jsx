import React from 'react';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import styles from './PricingCard.module.css';

const PricingCard = ({ plan, onSelect }) => {
  return (
    <Card className={`${styles.card} ${plan.featured ? styles.featured : ''}`}>
      {plan.featured && <div className={styles.badge}>Most Popular</div>}

      <h3 className={styles.title}>{plan.name}</h3>
      <div className={styles.price}>
        <span className={styles.currency}>₹</span>
        <span className={styles.amount}>{plan.price}</span>
        <span className={styles.period}>/month</span>
      </div>

      <ul className={styles.features}>
        {plan.features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            <span className={styles.check}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onSelect(plan)}
        variant={plan.featured ? 'primary' : 'secondary'}
        fullWidth
      >
        Choose Plan
      </Button>
    </Card>
  );
};

export default PricingCard;
