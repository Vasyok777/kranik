'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { blogPosts } from '@/src/data/store';
import styles from './BlogSection.module.scss';

export default function BlogSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, offsetWidth } = sliderRef.current;
    setActiveSlide(Math.round(scrollLeft / offsetWidth));
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: index * sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.heading}>
        <h2>Наш блог</h2>

        <Link href="#" className={styles.moreLink}>
          Ще 32 статті
          <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
        </Link>
      </div>

      <div className={styles.wrapper}>
        <button
          type="button"
          className={`${styles.blogArrow} ${styles.left}`}
          onClick={scrollLeft}
        >
          <span>‹</span>
        </button>

        <div className={styles.slider} ref={sliderRef} onScroll={handleScroll}>
          {blogPosts.map((post, i) => (
            <Link href="#" className={styles.card} key={`${post.title}-${i}`}>
              <div className={styles.image}>
                <Image
                  src={`/assets/blog/${post.image}`}
                  alt={post.title}
                  fill
                  sizes="300px"
                />
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <Image src="/images/icons/time.svg" alt="" width={18} height={18} />
                  <span>{post.meta}</span>
                </div>
                <span className={styles.date}>{post.date}</span>
              </div>

              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.description}>{post.description}</p>

              <div className={styles.footer}>
                <div className={styles.author}>
                  <div className={styles.avatar}>{post.author[0]}</div>
                  <span>{post.author}</span>
                </div>

                <div className={styles.reactions}>
                  <div className={styles.reaction}>
                    <Image src="/images/icons/like.svg" alt="" width={30} height={30} />
                    <span>{post.likes}</span>
                  </div>
                  <div className={styles.reaction}>
                    <Image src="/images/icons/dislike.svg" alt="" width={30} height={30} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.blogArrow} ${styles.right}`}
          onClick={scrollRight}
        >
          <span>›</span>
        </button>
      </div>

      <div className={styles.dots}>
        {blogPosts.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ''}`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Перейти до поста ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
