'use client';

import { useState } from 'react';
import styles from './AboutUs.module.scss';

export default function AboutUs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.aboutUs}>
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.title}>Інтернет-магазин сантехніки КРАНІК</h2>

          <div className={`${styles.textWrapper} ${isOpen ? styles.open : ''}`}>
            <p className={styles.text}>
              Наш інтернет-магазин сантехніки пропонує широкий асортимент товарів для
              облаштування ванної кімнати, кухні й систем водопостачання. У нас ви
              знайдете якісні змішувачі, душові системи, раковини, аксесуари та
              комплектуючі, які забезпечать комфорт і надійність у повсякденному житті.
            </p>

            <p className={styles.text}>
              Ми ретельно підбираємо продукцію, щоб запропонувати сучасні рішення, які
              поєднують стильний дизайн, довговічність і зручність використання. У
              нашому каталозі представлені товари, які підійдуть як для ремонту, так і
              для повного облаштування нового житла.
            </p>

            <p className={styles.text}>
              Ми прагнемо зробити процес покупки максимально простим і зручним:
              зрозумілий вибір, актуальні ціни та товари, які дійсно вирішують
              завдання вашого дому.
            </p>
          </div>

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? 'Згорнути' : 'Розгорнути'}
            <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
              ˅
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}