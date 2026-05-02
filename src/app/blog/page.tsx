import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import styles from './page.module.scss';

export default function BlogPage() {
  return (
    <main className={`page-root ${styles.page}`}>
      <Header />
      <section className={`container ${styles.section}`}>
        <h1>Блог</h1>
        <p>Тут можна буде зробити сторінку всіх статей, категорій блогу та детальної статті.</p>
      </section>
      <Footer />
    </main>
  );
}
