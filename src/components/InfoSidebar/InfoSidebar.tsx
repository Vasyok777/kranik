import Link from 'next/link';
import styles from './InfoSidebar.module.scss';

const menuItems = [
  { title: 'Про компанію', href: '/about' },
  { title: 'Контакти', href: '/contacts' },
  { title: 'Оплата та доставка', href: '/payment-and-delivery' },
  { title: 'Гарантія та сервіс', href: '/warranty-service' },
  { title: 'Повернення та обмін', href: '/return-and-exchange' },
  { title: 'Кредит і оплата частинами', href: '/credit' },
  { title: 'Поширені запитання', href: '/faq' },
];

type Props = {
  active: string;
};

export default function InfoSidebar({ active }: Props) {
  return (
    <aside className={styles.sidebar}>
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`${styles.sidebarItem} ${
            item.title === active ? styles.active : ''
          }`}
        >
          <span>{item.title}</span>
          <span className={styles.arrow}>›</span>
        </Link>
      ))}
    </aside>
  );
}