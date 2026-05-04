import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className={styles.item}>
            {index > 0 && (
              <span className={styles.separator}>
                <ChevronIcon />
              </span>
            )}

            {isLast || !item.href ? (
              <span className={styles.current}>{item.label}</span>
            ) : (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
