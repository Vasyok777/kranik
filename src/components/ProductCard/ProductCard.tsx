'use client';

import { useState } from 'react';
import styles from './ProductCard.module.scss';

type Product = {
  badge?: string;
  image: string;
  title: string;
  code: string;
  oldPrice?: string;
  sale?: string;
  price: string;
  rating?: string;
  reviews?: string;
  stock?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);

  const cleanCode = product.code
    .replace('Код товара:', '')
    .replace('Код товару:', '')
    .trim();

  return (
    <article className={styles.productCard}>
      {product.badge && <div className={styles.badge}>{product.badge}</div>}

      <button
        type="button"
        className={styles.favoriteTop}
        onClick={() => setIsFavorite((prev) => !prev)}
        aria-label={isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
      >
        <img
          src={
            isFavorite
              ? '/images/icons/heart-filled.svg'
              : '/images/icons/heart.svg'
          }
          alt="Обране"
        />
      </button>

      {!!product.sale && <div className={styles.saleTop}>{product.sale}</div>}

      <div className={styles.imageBlock}>
        <div className={styles.image}>
          <img
            src={`/images/products/${product.image}`}
            alt={product.title}
            className={styles.productImage}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.stockRow}>
          <span className={styles.stockIcon}>
            <img src="/images/icons/stock-check.svg" alt="Наявність" />
          </span>

          <span className={styles.stockText}>
            {product.stock || 'На складі м.Запоріжжя'}
          </span>
        </div>

        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.code}>Код товару: {cleanCode}</p>

        <div className={styles.priceMetaRow}>
          <div className={styles.leftPart}>
            {product.oldPrice && (
              <div className={styles.oldPrice}>{product.oldPrice}</div>
            )}

            <div className={styles.price}>{product.price}</div>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <img src="/images/icons/star.svg" alt="Рейтинг" />
              <span className={styles.ratingText}>
                {product.rating || '4.5'}
              </span>
            </div>

            <div className={styles.metaItem}>
              <img src="/images/icons/comment.svg" alt="Коментарі" />
              <span className={styles.reviewText}>
                {product.reviews || '7'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={styles.cartButton}>
            В кошик
          </button>

          <button
            type="button"
            className={`${styles.compareButton} ${
              isCompare ? styles.activeCompare : ''
            }`}
            onClick={() => setIsCompare((prev) => !prev)}
            aria-label={
              isCompare
                ? 'Прибрати з порівняння'
                : 'Додати до порівняння'
            }
          >
            <img
              src={
                isCompare
                  ? '/images/icons/compare-filled.svg'
                  : '/images/icons/compare.svg'
              }
              alt="Порівняння"
            />
          </button>
        </div>
      </div>
    </article>
  );
}