import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import InfoSidebar from '@/src/components/InfoSidebar/InfoSidebar';
import styles from './page.module.scss';

const advantages = [
  {
    icon: '/images/icons/warranty.svg',
    title: 'Офіційна гарантія',
    text: 'Гарантія від виробника на всі товари, що підтверджує їхню якість, надійність і безпечне використання.',
  },
  {
    icon: '/images/icons/return.svg',
    title: 'Повернення 14 днів',
    text: 'Можливість обміну або повернення товару протягом 14 днів без зайвих складнощів.',
  },
  {
    icon: '/images/icons/check-product.svg',
    title: 'Перевірка при отриманні',
    text: 'Перед оплатою ви можете оглянути товар, перевірити його стан та комплектацію.',
  },
  {
    icon: '/images/icons/support.svg',
    title: 'Підтримка клієнтів',
    text: 'Наші менеджери допоможуть з вибором товару та відповідять на всі запитання.',
  },
  {
    icon: '/images/icons/service.svg',
    title: 'Сервісне обслуговування',
    text: 'Підтримка та ремонт у сервісних центрах у разі виникнення гарантійних випадків.',
  },
  {
    icon: '/images/icons/quality.svg',
    title: 'Якість і надійність',
    text: 'Ми працюємо лише з перевіреними брендами та надійними рішеннями для дому.',
  },
];

const steps = [
  {
    icon: '/images/icons/contact.svg',
    title: 'Звернення',
    text: 'Зв’язок через сайт або на номер телефону.',
  },
  {
    icon: '/images/icons/receipt.svg',
    title: 'Підтвердження',
    text: 'Надайте чек або номер замовлення.',
  },
  {
    icon: '/images/icons/problem-solving.svg',
    title: 'Рішення проблеми',
    text: 'Ремонт, обмін або консультація.',
  },
];

export default function WarrantyAndServicePage() {
  return (
    <main className={`page-root ${styles.page}`}>
      <Header />

      <section className={`container ${styles.wrapper}`}>
        <div className={styles.breadcrumbs}>
          <span>Головна</span>
          <span>›</span>
          <strong>Гарантія та сервіс</strong>
        </div>

        <div className={styles.layout}>
          <InfoSidebar active="Гарантія та сервіс" />

          <div className={styles.content}>
            <h1>Гарантія та сервіс</h1>

            <div className={styles.card}>
              <h2>Гарантія</h2>

              <p>
                Наш інтернет-магазин сантехніки пропонує лише якісну та перевірену
                продукцію від надійних виробників. Усі товари відповідають сучасним
                стандартам і забезпечують довготривалу та безпечну експлуатацію у
                вашому домі.
              </p>

              <p>
                На кожен товар надається офіційна гарантія, термін якої залежить від
                категорії продукції та виробника. Ми дбаємо про те, щоб ви отримували
                не лише якісний товар, а й повноцінну підтримку після покупки.
              </p>

              <p>
                У разі виникнення несправностей ви можете скористатися гарантійним
                обслуговуванням у сервісних центрах. Для цього достатньо мати документ,
                що підтверджує покупку.
              </p>

              <p>
                Також ви маєте можливість повернути або обміняти товар протягом 14 днів,
                якщо він не використовувався та збережений у належному вигляді.
              </p>

              <p>
                Наша команда завжди готова допомогти вам із вибором товару,
                консультаціями та вирішенням будь-яких питань.
              </p>
            </div>

            <div className={`${styles.card} ${styles.advantagesCard}`}>
              <h2>Наші переваги</h2>

              <div className={styles.advantages}>
                {advantages.map((item) => (
                  <div className={styles.advantageItem} key={item.title}>
                    <div className={styles.icon}>
                      <img src={item.icon} alt="" />
                    </div>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <h2>Як скористатися гарантією</h2>

              <p>
                Якщо у вас виникли питання або несправності з товаром, ви можете
                звернутися до нашої служби підтримки або безпосередньо до сервісного
                центру. Ми допоможемо швидко вирішити ситуацію та підкажемо подальші дії.
              </p>

              <p>
                Для звернення достатньо мати документ, що підтверджує покупку, та опис
                проблеми. Наша команда супроводжує вас на кожному етапі — від звернення
                до повного вирішення питання.
              </p>
            </div>

            <div className={`${styles.card} ${styles.stepsCard}`}>
              <h2>Наші переваги</h2>

              <div className={styles.steps}>
                {steps.map((item) => (
                  <div className={styles.stepItem} key={item.title}>
                    <div className={styles.icon}>
                      <img src={item.icon} alt="" />
                    </div>

                    <div className={styles.stepText}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}