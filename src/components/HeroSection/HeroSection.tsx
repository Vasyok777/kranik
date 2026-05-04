'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styles from './HeroSection.module.scss';

const categories = [
  {
    title: 'Всі товари',
    icon: '/images/categories/all-products.svg',
    href: '#',
  },
  {
    title: 'Товари зі знижками',
    icon: '/images/categories/discount-products.svg',
    href: '#',
  },
  {
    title: 'Сантехніка',
    icon: '/images/categories/plumbing.svg',
    href: '#',
  },
  {
    title: 'Змішувачі',
    icon: '/images/categories/faucets.svg',
    href: '#',
  },
  {
    title: 'Душові системи',
    icon: '/images/categories/shower-systems.svg',
    href: '#',
  },
  {
    title: 'Опалення',
    icon: '/images/categories/heating.svg',
    href: '#',
  },
  {
    title: 'Кухня',
    icon: '/images/categories/kitchen.svg',
    href: '#',
  },

  {
    title: 'Водопостачання',
    icon: '/images/categories/water-supply.svg',
    href: '#',
  },
  {
    title: 'Очищення води',
    icon: '/images/categories/water-cleaning.svg',
    href: '#',
  },
  {
    title: 'Радіатори',
    icon: '/images/categories/heating.svg',
    href: '#',
  },
];

const banners = [
  { id: 1, image: '/images/hero/banner-1.jpg', href: '/' },
  { id: 2, image: '/images/hero/banner-2.jpg', href: '/' },
  { id: 3, image: '/images/hero/banner-3.jpg', href: '/' },
];

export default function HeroSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeBanner, setActiveBanner] = useState(0);

  const safeIndex = activeBanner % banners.length;
  const currentBanner = useMemo(() => banners[safeIndex], [safeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner(prev => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={`container ${styles.heroSection}`}>
      <aside className={styles.categoriesPanel}>
        <div
          className={styles.categoriesScroll}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <ul className={styles.categoriesList}>
            {categories.map((item) => {
              const isHovered = hoveredCategory === item.title;

              return (
                <li key={item.title} className={styles.categoryItem}>
                  <Link
                    href={item.href}
                    className={`${styles.categoryLink} ${isHovered ? styles.hovered : ''}`}
                    onMouseEnter={() => setHoveredCategory(item.title)}
                  >
                    <span className={styles.iconWrap}>
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={40}
                        height={40}
                        className={styles.categoryIcon}
                      />
                    </span>

                    <span className={styles.categoryText}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className={styles.heroBannerWrap}>
        <div className={styles.heroBanner}>
          <button
            type="button"
            className={`${styles.heroArrow} ${styles.left}`}
            aria-label="Попередній слайд"
            onClick={goPrev}
          >
            <span>‹</span>
          </button>

          <Link
            href={currentBanner.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroContent}
          >
            <div className={styles.heroImageWrap}>
              <img
                src={currentBanner.image}
                alt={`banner-${currentBanner.id}`}
                className={styles.heroImage}
              />
            </div>
          </Link>

          <button
            type="button"
            className={`${styles.heroArrow} ${styles.right}`}
            aria-label="Наступний слайд"
            onClick={goNext}
          >
            <span>›</span>
          </button>
        </div>

        <div className={styles.heroDots}>
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              className={`${styles.dot} ${index === activeBanner ? styles.activeDot : ''}`}
              aria-label={`Перейти до банера ${index + 1}`}
              onClick={() => setActiveBanner(index)}
            />
          ))}
        </div>

        <button type="button" className={styles.mobileCatalogBar}>
          ≡ Каталог товарів ↓
        </button>
      </div>
    </section>
  );
}