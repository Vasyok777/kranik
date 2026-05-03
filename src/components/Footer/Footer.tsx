import Image from 'next/image';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Image src="/assets/logo.svg" alt="Kranik" width={104} height={36} />
          <p className={styles.description}>
            Інтернет-магазин якісної сантехніки для вашого дому. Ми пропонуємо сучасні рішення
            для ванної кімнати та кухні: змішувачі, бойлери, душові системи, унітази та аксесуари.
          </p>
          <div className={styles.socials}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Каталог</h4>
          <a href="#">Змішувачі</a>
          <a href="#">Бойлери</a>
          <a href="#">Душові системи</a>
          <a href="#">Унітази</a>
          <a href="#">Інсталяції</a>
          <a href="#">Аксесуари</a>
        </div>

        <div className={styles.column}>
          <h4>Інформація</h4>
          <a href="#">Про нас</a>
          <a href="#">Контакти</a>
          <a href="#">Доставка і оплата</a>
          <a href="#">Гарантія</a>
          <a href="#">Повернення товару</a>
          <a href="#">Політика конфіденційності</a>
        </div>

        <div className={styles.column}>
          <h4>Контакти</h4>
          <a href="#">+38 (067) 123-45-67</a>
          <a href="#">info@kranik.ua</a>
          <p>Пн - Пт: 09:00 - 19:00</p>
          <p>Сб - Нд: 10:00 - 18:00</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>© 2025 KRANIK — Всі права захищені.</div>
    </footer>
  );
}
