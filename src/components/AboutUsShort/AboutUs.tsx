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

          <div className={styles.textBlock}>
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

              <p className={styles.text}>
                Наші фахівці готові допомогти з підбором обладнання, відповісти на
                будь-які запитання та підказати оптимальне рішення для вашого проєкту.
                Ми співпрацюємо лише з перевіреними виробниками — VitrA, Grohe, Hansgrohe,
                Roca, Kohler — щоб гарантувати якість кожного виробу.
              </p>

              <p className={styles.text}>
                Доставляємо товари по всій Україні. Швидка обробка замовлень, зручне
                повернення та прозорі умови — ось що робить покупки у нас комфортними.
                Приєднуйтесь до тисяч задоволених клієнтів, які вже облаштували свої
                домівки разом із КРАНІК.
              </p>
            </div>

            {!isOpen && <div className={styles.gradient} />}
          </div>

          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? 'Згорнути' : 'Розгорнути'}
            <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
