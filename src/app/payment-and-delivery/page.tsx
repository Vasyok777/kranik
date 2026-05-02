'use client';

import { useState } from 'react';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import InfoSidebar from '@/src/components/InfoSidebar/InfoSidebar';
import styles from './page.module.scss';

const faqItems = [
  {
    question: 'Які способи оплати доступні?',
    answer:
      'Ви можете оплатити замовлення готівкою при отриманні, банківською карткою онлайн або безготівковим розрахунком. Для юридичних осіб доступна оплата за рахунком після погодження деталей із менеджером.',
  },
  {
    question: 'Скільки коштує доставка?',
    answer:
      'Вартість доставки залежить від габаритів товару, ваги замовлення, обраної служби доставки та населеного пункту. Точну суму менеджер повідомить після оформлення замовлення або вона буде розрахована службою доставки.',
  },
  {
    question: 'Скільки часу займає доставка?',
    answer:
      'Зазвичай доставка займає від 1 до 3 робочих днів після підтвердження замовлення. Для великогабаритної сантехніки або віддалених населених пунктів термін може бути трохи довшим.',
  },
  {
    question: 'Чи можна оплатити при отриманні?',
    answer:
      'Так, ви можете оплатити замовлення при отриманні у відділенні служби доставки або кур’єру. Перед оплатою рекомендуємо оглянути товар, перевірити комплектацію та переконатися, що він не має пошкоджень.',
  },
  {
    question: 'Чи є самовивіз?',
    answer:
      'Так, самовивіз можливий за попереднім погодженням із менеджером. Після підтвердження замовлення ми повідомимо адресу, графік роботи та час, коли товар буде готовий до видачі.',
  },
  {
    question: 'Що робити, якщо товар пошкоджений?',
    answer:
      'Якщо товар був пошкоджений під час доставки, обов’язково зафіксуйте це у відділенні або при кур’єрі, зробіть фото пошкодження та зв’яжіться з нами. Ми допоможемо вирішити ситуацію та підкажемо подальші дії.',
  },
];

export default function PaymentAndDeliveryPage() {
  const [openedFaq, setOpenedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenedFaq((prev) => (prev === index ? null : index));
  };

  return (
    <main className={`page-root ${styles.page}`}>
      <Header />

      <section className={`container ${styles.wrapper}`}>
        <div className={styles.breadcrumbs}>
          <span>Головна</span>
          <span>›</span>
          <strong>Оплата та доставка</strong>
        </div>

        <div className={styles.layout}>
          <InfoSidebar active="Оплата та доставка" />

          <div className={styles.content}>
            <h1>Оплата і доставка</h1>

            <div className={styles.card}>
              <p>
                Ми створили зручні умови оплати та доставки, щоб ви могли швидко,
                безпечно й без зайвих клопотів отримати необхідну сантехніку для дому,
                квартири, офісу чи комерційного приміщення.
              </p>
              <p>
                У нашому інтернет-магазині можна обрати оптимальний спосіб оплати та
                доставки відповідно до ваших потреб. Ми уважно обробляємо кожне
                замовлення, перевіряємо комплектацію та дбаємо про надійне пакування
                товарів перед відправкою.
              </p>
            </div>

            <div className={styles.card}>
              <h2>Способи оплати</h2>
              <p>Ви можете оплатити замовлення зручним для вас способом:</p>

              <ul>
                <li>готівкою при отриманні замовлення;</li>
                <li>банківською карткою онлайн;</li>
                <li>безготівковим розрахунком для юридичних осіб;</li>
                <li>через доступні платіжні сервіси.</li>
              </ul>

              <p>
                Усі платежі проходять безпечно, а після оформлення замовлення наш
                менеджер може уточнити деталі оплати та підтвердити наявність товару.
              </p>
            </div>

            <div className={styles.card}>
              <h2>Доставка по Україні</h2>
              <p>
                Ми здійснюємо доставку сантехніки по всій Україні через надійні служби
                доставки. Ви можете обрати зручний варіант отримання залежно від міста,
                габаритів товару та ваших побажань.
              </p>

              <ul>
                <li>доставка у відділення служби доставки;</li>
                <li>адресна доставка кур’єром;</li>
                <li>самовивіз за попереднім погодженням.</li>
              </ul>

              <p>
                Зазвичай доставка займає від 1 до 3 робочих днів після підтвердження
                замовлення. Для великогабаритних товарів терміни та вартість доставки
                можуть уточнюватися окремо.
              </p>
            </div>

            <div className={`${styles.card} ${styles.advantagesCard}`}>
              <h2>Наші переваги</h2>

              <div className={styles.advantages}>
                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <img src="/images/icons/convenient-payment.svg" alt="" />
                  </div>
                  <div>
                    <h3>Зручна оплата</h3>
                    <p>
                      Обирайте комфортний спосіб оплати: готівкою при отриманні,
                      банківською карткою онлайн або безготівковим розрахунком для
                      компаній та підприємців.
                    </p>
                  </div>
                </div>

                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <img src="/images/icons/pickup.svg" alt="" />
                  </div>
                  <div>
                    <h3>Самовивіз</h3>
                    <p>
                      За попереднім погодженням ви можете самостійно забрати замовлення
                      у зручний час, без очікування кур’єра та додаткових витрат на
                      доставку.
                    </p>
                  </div>
                </div>

                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <img src="/images/icons/fast-delivery.svg" alt="" />
                  </div>
                  <div>
                    <h3>Швидка доставка</h3>
                    <p>
                      Ми оперативно обробляємо замовлення та передаємо їх у доставку,
                      щоб потрібна сантехніка якнайшвидше прибула у ваше місто.
                    </p>
                  </div>
                </div>

                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <img src="/images/icons/customer-support.svg" alt="" />
                  </div>
                  <div>
                    <h3>Підтримка клієнтів</h3>
                    <p>
                      Наші менеджери допоможуть підібрати товар, уточнити характеристики,
                      перевірити сумісність позицій та супроводять замовлення до
                      отримання.
                    </p>
                  </div>
                </div>

                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <img src="/images/icons/reliable-packaging.svg" alt="" />
                  </div>
                  <div>
                    <h3>Надійне пакування</h3>
                    <p>
                      Кожне замовлення ретельно пакується з урахуванням типу товару,
                      щоб змішувачі, кераміка, душові системи та аксесуари доїхали
                      цілими.
                    </p>
                  </div>
                </div>

                <div className={styles.advantageItem}>
                  <div className={styles.icon}>
                    <img src="/images/icons/operational-processing.svg" alt="" />
                  </div>
                  <div>
                    <h3>Оперативна обробка</h3>
                    <p>
                      Після оформлення заявки ми швидко перевіряємо наявність товару,
                      погоджуємо деталі з клієнтом і готуємо замовлення до відправки.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.faqCard}`}>
              <h2>Часті запитання</h2>

              <div className={styles.faqList}>
                {faqItems.map((item, index) => {
                  const isOpen = openedFaq === index;

                  return (
                    <div
                      key={item.question}
                      className={`${styles.faqBox} ${isOpen ? styles.faqBoxOpen : ''}`}
                    >
                      <button
                        className={styles.faqItem}
                        type="button"
                        onClick={() => toggleFaq(index)}
                      >
                        <span>{item.question}</span>
                        <span className={styles.plus}>{isOpen ? '−' : '+'}</span>
                      </button>

                      {isOpen && (
                        <div className={styles.faqAnswer}>
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}