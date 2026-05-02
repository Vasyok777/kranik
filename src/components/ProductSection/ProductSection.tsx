'use client';
import { useRef } from 'react';
import { Product } from '@/src/data/store';
import ProductCard from '@/src/components/ProductCard/ProductCard';
import styles from './ProductSection.module.scss';

type Props = {
  title: string;
  linkLabel: string;
  products?: Product[];
};

export default function ProductSection({
  title,
  linkLabel,
  products = [],
}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
  if (!gridRef.current) return;
  gridRef.current.scrollBy({
    left: -(272 + 16),
    behavior: 'smooth',
  });
};

const scrollRight = () => {
  if (!gridRef.current) return;
  gridRef.current.scrollBy({
    left: 272 + 16,
    behavior: 'smooth',
  });
};

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        <a href="#">{linkLabel} ›</a>
      </div>

      <div className={styles.wrapper}>
        <button
          type="button"
          className={`${styles.sliderArrow} ${styles.left}`}
          onClick={scrollLeft}
          aria-label="Попередні товари"
        >
          ‹
        </button>

        <div ref={gridRef} className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.title + product.code}
              product={product}
            />
          ))}
        </div>

        <button
          type="button"
          className={`${styles.sliderArrow} ${styles.right}`}
          onClick={scrollRight}
          aria-label="Наступні товари"
        >
          ›
        </button>
      </div>
    </section>
  );
}