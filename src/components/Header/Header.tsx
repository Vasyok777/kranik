'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { PHONE, PHONE_HREF } from '@/src/data/constants';
import { WhatsAppIcon, ViberIcon, TelegramIcon } from '@/src/components/icons';

type HeaderProps = {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
};

export default function Header({
  onOpenLogin,
  onOpenRegister,
}: HeaderProps) {
  const [isMoreHover, setIsMoreHover] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLangHover, setIsLangHover] = useState(false);
  const [currentLang, setCurrentLang] = useState<'Укр' | 'Рус'>('Укр');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);

  const langRef = useRef<HTMLDivElement | null>(null);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }

      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isCatalogOpen || isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isCatalogOpen, isMobileMenuOpen]);

  const secondLang = currentLang === 'Укр' ? 'Рус' : 'Укр';

  const changeLang = () => {
    setCurrentLang(secondLang);
    setIsLangOpen(false);
  };

  const toggleCatalog = () => {
    setIsCatalogOpen(prev => !prev);
  };

  const closeCatalog = () => {
    setIsCatalogOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuClosing(true);
  };

  const catalogGroups = [
    {
      title: 'Кухонні мийки',
      links: ['Нержавіючі', 'Гранітні', 'Керамічні', 'Врізні', 'Накладні', 'Подвійні'],
    },
    {
      title: 'Змішувачі для кухні',
      links: [
        'Одноважільні',
        'Двохвентильні',
        'З висувним виливом',
        'З гнучким виливом',
        'З підключенням фільтра',
      ],
    },
    {
      title: 'Фільтри для води',
      links: ['Зворотний осмос', 'Проточні фільтри', 'Картриджі', 'Крани для фільтра'],
    },
    {
      title: 'Фільтри для води',
      links: ['Зворотний осмос', 'Проточні фільтри', 'Картриджі', 'Крани для фільтра'],
    },
    {
      title: 'Кухонні мийки',
      links: ['Нержавіючі', 'Гранітні', 'Керамічні', 'Врізні', 'Накладні', 'Подвійні'],
    },
    {
      title: 'Змішувачі для кухні',
      links: [
        'Одноважільні',
        'Двохвентильні',
        'З висувним виливом',
        'З гнучким виливом',
        'З підключенням фільтра',
      ],
    },
  ];

  const sideCategories = [
    'Всі товари',
    'Товари зі знижками',
    'Сантехніка',
    'Змішувачі',
    'Душові системи',
    'Водопостачання',
    'Опалення',
    'Очищення води',
    'Кухня',
    'Меблі для ванної',
    'Інструменти',
  ];

  const brandLogos = ['VitrA', 'Roca', 'Oras', 'KOHLER', 'GROHE'];

  return (
    <>
      {isCatalogOpen && (
        <div
          className={styles.catalogOverlay}
          onClick={closeCatalog}
        />
      )}

      <div className={styles.shippingBar}>Безкоштовна доставка від 1000 грн</div>

      <div className={styles.headerTopPart}>
        <div className={styles.topNavWrapper}>
            <div className={`container ${styles.topNav}`}>
              <nav className={styles.topLinks}>
                <Link href="#" className={styles.topLink}>Про компанію</Link>
                <Link href="#" className={styles.topLink}>Контакти</Link>
                <Link href="/payment-and-delivery" className={styles.topLink}>Оплата і доставка</Link>
                <Link href="#" className={styles.topLink}>Послуги</Link>
                <Link href="#" className={styles.topLink}>Бренди</Link>
                <Link href="#" className={styles.topLink}>Блог</Link>
                <Link href="#" className={styles.topLink}>Акції</Link>

                <button
                  type="button"
                  className={styles.moreButton}
                  onMouseEnter={() => setIsMoreHover(true)}
                  onMouseLeave={() => setIsMoreHover(false)}
                >
                  <span>Більше</span>
                  <img
                    src={
                      isMoreHover
                        ? '/images/icons/arrow-down-orange.svg'
                        : '/images/icons/arrow-down.svg'
                    }
                    alt=""
                    className={styles.moreArrow}
                  />
                </button>
              </nav>

              <div className={styles.topRight}>
                <span className={styles.shopsLabel}>Наші магазини:</span>

                <button type="button" className={styles.locationButton}>
                  <img src="/images/icons/location.svg" alt="" className={styles.locationIcon} />
                  <span>м.Запоріжжя</span>
                </button>

                <a href={PHONE_HREF} className={styles.phone}>
                  {PHONE}
                </a>

                <div
                  className={styles.langSwitcher}
                  ref={langRef}
                  onMouseEnter={() => setIsLangHover(true)}
                  onMouseLeave={() => setIsLangHover(false)}
                >
                  <button
                    type="button"
                    className={`${styles.langButton} ${isLangOpen ? styles.langButtonOpen : ''}`}
                    onClick={() => setIsLangOpen(prev => !prev)}
                  >
                    <span>{currentLang}</span>
                    <img
                      src={
                        isLangHover || isLangOpen
                          ? '/images/icons/arrow-down-orange.svg'
                          : '/images/icons/arrow-down.svg'
                      }
                      alt=""
                      className={`${styles.langArrow} ${isLangOpen ? styles.langArrowOpen : ''}`}
                    />
                  </button>

                  {isLangOpen && (
                    <div className={styles.langDropdown}>
                      <button
                        type="button"
                        className={styles.langDropdownItem}
                        onClick={changeLang}
                      >
                        {secondLang}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.mainWrapper}>
          <div className={`container ${styles.main}`}>
            <button
              type="button"
              className={styles.mobileBurger}
              onClick={toggleMobileMenu}
              aria-label="Відкрити меню"
            >
              <img
                src="/images/icons/burger.svg"
                alt=""
                className={styles.mobileBurgerIcon}
              />
            </button>

            <Link href="#" className={styles.logo}>
              <Image
                src="/assets/logo.svg"
                alt="logo"
                width={190}
                height={54}
                priority
                style={{ height: 'auto' }}
              />
            </Link>

            <div className={styles.catalogWrapper} ref={catalogRef}>
              <button
                type="button"
                className={`${styles.catalogButton} ${isCatalogOpen ? styles.catalogButtonActive : ''}`}
                onClick={toggleCatalog}
              >
                <img
                  src="/images/icons/burger-white.svg"
                  alt=""
                  className={styles.catalogIcon}
                />
                <span className={styles.catalogText}>Каталог товарів</span>
              </button>

              {isCatalogOpen && (
                <div className={styles.catalogDropdown}>
                  <div className={`container ${styles.catalogDropdownContainer}`}>
                    <div className={styles.catalogDropdownInner}>
                      <aside className={styles.catalogSidebar}>
                        {sideCategories.map(category => (
                          <button
                            key={category}
                            type="button"
                            className={`${styles.catalogSidebarItem} ${
                              category === 'Кухня' ? styles.catalogSidebarItemActive : ''
                            }`}
                          >
                            <span className={styles.catalogSidebarIcon}></span>
                            <span>{category}</span>
                          </button>
                        ))}
                      </aside>

                      <div className={styles.catalogContent}>
                        <div className={styles.catalogGrid}>
                          {catalogGroups.map((group, i) => (
                            <div
                              key={`${group.title}-${i}`}
                              className={styles.catalogCard}
                            >
                              <h4 className={styles.catalogCardTitle}>{group.title}</h4>

                              <div className={styles.catalogCardLinks}>
                                {group.links.map(link => (
                                  <Link key={link} href="#" className={styles.catalogCardLink}>
                                    {link}
                                  </Link>
                                ))}

                                <Link href="#" className={styles.catalogAllLink}>
                                  Переглянути все
                                  <span className={styles.catalogAllArrow}>→</span>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className={styles.catalogBrands}>
                          {brandLogos.map(brand => (
                            <div key={brand} className={styles.catalogBrandItem}>
                              {brand}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.searchBar}>
              <input placeholder="Пошук змішувачів, бойлерів..." />
              <button type="button" className={styles.searchButton}>
                <img src="/images/icons/search.svg" alt="" className={styles.searchIcon} />
              </button>
            </div>

            <div className={styles.actions}>
              <div className={styles.authBlock}>
                <button
                  type="button"
                  className={styles.authButton}
                  onClick={onOpenLogin}
                >
                  <img src="/images/icons/user.svg" alt="" className={styles.actionIcon} />
                  <span>Вхід</span>
                </button>

                <span className={styles.authDivider}>/</span>

                <button
                  type="button"
                  className={styles.authButton}
                  onClick={onOpenRegister}
                >
                  <span>Реєстрація</span>
                </button>
              </div>

              <Link href="/compare" className={styles.iconAction}>
                <img src="/images/icons/compare.svg" alt="" className={styles.actionIcon} />
              </Link>

              <Link href="/wishlist" className={styles.iconAction}>
                <img src="/images/icons/heart.svg" alt="" className={styles.actionIcon} />
                <span className={styles.favoriteBadge}>2</span>
              </Link>

              <Link href="/cart" className={styles.cartAction}>
                <img src="/images/icons/cart.svg" alt="" className={styles.cartIcon} />
                <span className={styles.cartText}>Кошик порожній</span>
              </Link>
            </div>
          </div>

          <div className={`container ${styles.mobileSearchRow}`}>
            <div className={styles.mobileSearch}>
              <input placeholder="Пошук..." />
              <button
                type="button"
                className={styles.mobileSearchButton}
                aria-label="Пошук"
              >
                <img src="/images/icons/search.svg" alt="" className={styles.searchIcon} />
              </button>
            </div>
          </div>
        </div>

        {/* мобільне меню перенесено за межі header — див. нижче */}

      </header>

      {(isMobileMenuOpen || isMobileMenuClosing) && (
        <div
          className={`${styles.mobileMenu} ${isMobileMenuClosing ? styles.mobileMenuClosing : ''}`}
          ref={mobileMenuRef}
          onAnimationEnd={() => {
            if (isMobileMenuClosing) {
              setIsMobileMenuClosing(false);
              setIsMobileMenuOpen(false);
            }
          }}
        >

            {/* Шапка */}
            <div className={styles.mobileMenuHeader}>
              <Link href="/" onClick={closeMobileMenu}>
                <img src="/assets/logo.svg" alt="Kranik" style={{ height: '36px', width: 'auto' }} />
              </Link>
              <button type="button" className={styles.mobileMenuClose} onClick={closeMobileMenu} aria-label="Закрити">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Іконки: порівняння, вхід, обране */}
            <div className={styles.mobileIconRow}>
              <Link href="/compare" className={styles.mobileIconItem} onClick={closeMobileMenu}>
                <img src="/images/icons/compare.svg" alt="" width={24} height={24} />
                <span>Порівняння</span>
              </Link>
              <button type="button" className={styles.mobileIconItem} onClick={() => { closeMobileMenu(); onOpenLogin?.(); }}>
                <img src="/images/icons/user.svg" alt="" width={24} height={24} />
                <span>Вхід / Реєстрація</span>
              </button>
              <Link href="/wishlist" className={styles.mobileIconItem} onClick={closeMobileMenu}>
                <img src="/images/icons/heart.svg" alt="" width={24} height={24} />
                <span>Обране</span>
              </Link>
            </div>

            {/* Навігація */}
            <nav className={styles.mobileMenuNav}>
              <Link href="/catalog" className={`${styles.mobileMenuItem} ${styles.mobileMenuItemCatalog}`} onClick={closeMobileMenu}>
                <span className={styles.mobileMenuItemLeft}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/><rect x="12" y="1" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/><rect x="1" y="12" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/><rect x="12" y="12" width="7" height="7" rx="1" stroke="white" strokeWidth="1.5"/></svg>
                  Каталог товарів
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>

              {[
                { href: '#', label: 'Про компанію', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 18V7L10 2L17 7V18H12V13H8V18H3Z" stroke="#1B365D" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
                { href: '/contacts', label: 'Контакти', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M17.5 14.1v2.4a1.6 1.6 0 0 1-1.74 1.6A15.84 15.84 0 0 1 9 15.85a15.6 15.6 0 0 1-4.8-4.8 15.84 15.84 0 0 1-2.25-6.82A1.6 1.6 0 0 1 3.52 2.5h2.4a1.6 1.6 0 0 1 1.6 1.38c.1.76.29 1.5.56 2.22a1.6 1.6 0 0 1-.36 1.69L6.7 8.82a12.8 12.8 0 0 0 4.8 4.8l1.03-1.03a1.6 1.6 0 0 1 1.69-.36c.72.27 1.46.46 2.22.56a1.6 1.6 0 0 1 1.38 1.62v-.01Z" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { href: '/payment-and-delivery', label: 'Оплата і доставка', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M1.5 4.5H13.5V13.5H1.5V4.5ZM13.5 7.5H16L18.5 10.5V13.5H13.5V7.5Z" stroke="#1B365D" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="5" cy="15.5" r="1.5" stroke="#1B365D" strokeWidth="1.5"/><circle cx="15.5" cy="15.5" r="1.5" stroke="#1B365D" strokeWidth="1.5"/></svg> },
                { href: '/blog', label: 'Блог', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 13.5L13.5 4L16 6.5L6.5 16L3.5 16.5L4 13.5Z" stroke="#1B365D" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
                { href: '#', label: 'Акції', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="2" stroke="#1B365D" strokeWidth="1.5"/><circle cx="13" cy="13" r="2" stroke="#1B365D" strokeWidth="1.5"/><path d="M5 15L15 5" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                { href: '#', label: 'Більше', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="4" cy="10" r="1.5" fill="#1B365D"/><circle cx="10" cy="10" r="1.5" fill="#1B365D"/><circle cx="16" cy="10" r="1.5" fill="#1B365D"/></svg> },
              ].map(item => (
                <Link key={item.label} href={item.href} className={styles.mobileMenuItem} onClick={closeMobileMenu}>
                  <span className={styles.mobileMenuItemLeft}>
                    {item.icon}
                    {item.label}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              ))}
            </nav>

            <div className={styles.mobileMenuDivider} />

            {/* Нижня секція */}
            <div className={styles.mobileMenuBottom}>
              <Link href="#" className={styles.mobileBottomItem} onClick={closeMobileMenu}>
                <span className={styles.mobileMenuItemLeft}>
                  <img src="/images/icons/location.svg" alt="" width={20} height={20} />
                  <span>
                    <span className={styles.mobileBottomTitle}>Наші магазини — м. Запоріжжя</span>
                    <span className={styles.mobileBottomSub}>Переглянути на карті</span>
                  </span>
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>

              <a href={PHONE_HREF} className={styles.mobileBottomItem}>
                <span className={styles.mobileMenuItemLeft}>
                  <img src="/images/icons/contact.svg" alt="" width={20} height={20} />
                  <span>
                    <span className={styles.mobileBottomTitle}>{PHONE}</span>
                    <span className={styles.mobileBottomSub}>Передзвоніть нам</span>
                  </span>
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>

              <div className={styles.mobileBottomItem}>
                <span className={styles.mobileMenuItemLeft}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#1B365D" strokeWidth="1.5"/><path d="M2 10H18M10 2C8 5 7 7.5 7 10s1 5 3 8M10 2c2 3 3 5.5 3 8s-1 5-3 8" stroke="#1B365D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <span className={styles.mobileBottomTitle}>Українська (UA)</span>
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 8L10 13L15 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            {/* Соцмережі */}
            <div className={styles.mobileSocials}>
              <p className={styles.mobileSocialsTitle}>Ми в соціальних месенджерах</p>
              <div className={styles.mobileSocialsIcons}>
                <a href="#" className={styles.mobileSocialBtn} aria-label="WhatsApp"><WhatsAppIcon /></a>
                <a href="#" className={styles.mobileSocialBtn} aria-label="Viber"><ViberIcon /></a>
                <a href="#" className={styles.mobileSocialBtn} aria-label="Telegram"><TelegramIcon /></a>
              </div>
            </div>

          </div>
        )}
    </>
  );
}