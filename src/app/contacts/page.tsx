import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import styles from './page.module.scss';
import styles from './page.module.scss';

export default function ContactsPage() {
  return (
    <main className={`page-root ${styles.page}`}>
      <Header />
      <section className={`container ${styles.section}`}>
        <h1>Контакти</h1>
        <p>Тут можна буде розмістити контакти, карту, форму зворотного зв’язку та графік роботи.</p>
      </section>
      <Footer />
    </main>
  );
}
