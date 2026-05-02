import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className={styles.item}>
            {item.href && !isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <strong>{item.label}</strong>
            )}

            {!isLast && <span className={styles.separator}>›</span>}
          </span>
        );
      })}
    </div>
  );
}