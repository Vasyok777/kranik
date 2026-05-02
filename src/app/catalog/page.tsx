import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.scss';

export default function CatalogPage() {
  return (
    <main className={`page-root ${styles.page}`}>
      <Header />
      <section className={`container ${styles.section}`}>
        <h1>Каталог товарів</h1>
        <p>Тут можна буде зробити сторінку каталогу з фільтрами, сортуванням і сіткою товарів.</p>
      </section>
      <Footer />
    </main>
  );
}
