'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import Breadcrumb from '@/src/components/Breadcrumb/Breadcrumb';
import Pagination from '@/src/components/Pagination/Pagination';
import { brandsList } from '@/src/data/store';
import styles from './page.module.scss';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MOBILE_PER_PAGE = 15;

export default function BrandsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeLetter = searchParams.get('letter');
  const mobilePage = Number(searchParams.get('page') || '1');

  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updateArrows = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const updateUrl = useCallback((letter: string | null, page: number) => {
    const params = new URLSearchParams();
    if (letter) params.set('letter', letter);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    router.push(query ? `/brands?${query}` : '/brands', { scroll: false });
  }, [router]);

  const handleLetterChange = (letter: string | null) => {
    updateUrl(letter, 1);
  };

  const handlePageChange = (page: number) => {
    updateUrl(activeLetter, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollAlphabet = (dir: 'left' | 'right') => {
    sliderRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  const filtered = activeLetter
    ? brandsList.filter(b => b.name.toUpperCase().startsWith(activeLetter))
    : brandsList;

  const availableLetters = ALPHABET.filter(letter =>
    brandsList.some(b => b.name.toUpperCase().startsWith(letter))
  );

  const totalMobilePages = Math.ceil(filtered.length / MOBILE_PER_PAGE);
  const displayedBrands = isMobile
    ? filtered.slice((mobilePage - 1) * MOBILE_PER_PAGE, mobilePage * MOBILE_PER_PAGE)
    : filtered;

  return (
    <main className="page-root">
      <Header />

      <div className={`container ${styles.page}`}>
        <Breadcrumb items={[
          { label: 'Головна', href: '/' },
          { label: 'Бренди' },
        ]} />

        <h1 className={styles.title}>Бренди</h1>

        <div className={styles.alphabetWrapper}>
          <button
            type="button"
            className={styles.alphArrow}
            onClick={() => scrollAlphabet('left')}
            disabled={!canScrollLeft}
            aria-label="Ліворуч"
          >
            ‹
          </button>

          <div className={styles.alphabetTrack} ref={sliderRef} onScroll={updateArrows}>
            <button
              type="button"
              className={`${styles.letterBtn} ${!activeLetter ? styles.letterActive : ''}`}
              onClick={() => handleLetterChange(null)}
            >
              All
            </button>

            {availableLetters.map(letter => (
              <button
                key={letter}
                type="button"
                className={`${styles.letterBtn} ${activeLetter === letter ? styles.letterActive : ''}`}
                onClick={() => handleLetterChange(activeLetter === letter ? null : letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.alphArrow}
            onClick={() => scrollAlphabet('right')}
            disabled={!canScrollRight}
            aria-label="Праворуч"
          >
            ›
          </button>
        </div>

        {displayedBrands.length > 0 ? (
          <div className={styles.grid}>
            {displayedBrands.map(brand => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className={styles.card}>
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={100}
                    height={40}
                    className={styles.logo}
                  />
                ) : (
                  <span className={styles.name}>{brand.name}</span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Брендів на цю літеру не знайдено</p>
        )}

        {isMobile && totalMobilePages > 1 && (
          <Pagination
            currentPage={mobilePage}
            totalPages={totalMobilePages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}
