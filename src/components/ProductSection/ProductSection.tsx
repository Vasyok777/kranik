'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '@/src/data/store';
import ProductCard from '@/src/components/ProductCard/ProductCard';
import styles from './ProductSection.module.scss';

type Props = {
  title: string;
  linkLabel: string;
  products?: Product[];
};

export default function ProductSection({ title, linkLabel, products = [] }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: false,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    update();
    emblaApi.on('select', update);
    emblaApi.on('reInit', update);

    return () => {
      emblaApi.off('select', update);
      emblaApi.off('reInit', update);
    };
  }, [emblaApi]);

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        <a href="#">{linkLabel} ›</a>
      </div>

      {/* Десктоп: Embla carousel */}
      <div className={styles.carouselWrapper}>
        <button
          type="button"
          className={`${styles.sliderArrow} ${styles.left} ${!canPrev ? styles.hidden : ''}`}
          onClick={scrollPrev}
          aria-label="Попередні товари"
          disabled={!canPrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="#0F488F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {products.map((product, i) => (
              <div className={styles.emblaSlide} key={`${product.code}-${i}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.sliderArrow} ${styles.right} ${!canNext ? styles.hidden : ''}`}
          onClick={scrollNext}
          aria-label="Наступні товари"
          disabled={!canNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#0F488F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Мобільний: grid + show more */}
      <div className={styles.mobileGrid}>
        <div className={`${styles.mobileGridInner} ${showAll ? styles.expanded : ''}`}>
          {products.map((product, i) => (
            <ProductCard key={`${product.code}-mobile-${i}`} product={product} />
          ))}
        </div>

        {!showAll && products.length > 4 && (
          <div className={styles.showMoreWrap}>
            <button
              type="button"
              className={styles.showMoreBtn}
              onClick={() => setShowAll(true)}
              aria-label="Показати більше"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
