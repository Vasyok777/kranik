import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import styles from './page.module.scss';

export default function ProductPage() {
  return (
    <main className={`page-root ${styles.page}`}>
      <Header />
      <section className={`container ${styles.section}`}>
        <h1>Сторінка товару</h1>
        <p>Тут можна буде зробити фото товару, характеристики, опис, відгуки та блок схожих товарів.</p>
      </section>
      <Footer />
    </main>
  );
}
