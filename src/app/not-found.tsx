import Image from 'next/image';
import Link from 'next/link';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className="page-root">
      <Header />

      <section className={styles.section}>
        <div className={`container ${styles.inner}`}>
          <Image
            src="/images/404.png"
            alt="404"
            width={520}
            height={320}
            className={styles.image}
            priority
          />
          <h1 className={styles.title}>Сторінку не знайдено</h1>
          <p className={styles.description}>
            На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryBtn}>
              На головну
            </Link>
            <Link href="/catalog" className={styles.secondaryBtn}>
              До каталогу
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
