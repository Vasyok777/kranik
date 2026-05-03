'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
      {(isCatalogOpen || isMobileMenuOpen) && (
        <div
          className={styles.catalogOverlay}
          onClick={() => {
            closeCatalog();
            closeMobileMenu();
          }}
        />
      )}

      <div className={styles.headerTopPart}>
        <div className={styles.shippingBar}>Безкоштовна доставка від 1000 грн</div>

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

                <a href="tel:0800337049" className={styles.phone}>
                  0 800 33 70 49
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
                          {catalogGroups.map(group => (
                            <div
                              key={`${group.title}-${group.links[0]}`}
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

        {isMobileMenuOpen && (
          <div className={styles.mobileMenu} ref={mobileMenuRef}>
            <div className={styles.mobileMenuHeader}>
              <span>Меню</span>

              <button
                type="button"
                className={styles.mobileMenuClose}
                onClick={closeMobileMenu}
                aria-label="Закрити меню"
              >
                ×
              </button>
            </div>

            <nav className={styles.mobileMenuNav}>
              <Link href="#" className={styles.mobileMenuLink} onClick={closeMobileMenu}>
                Про компанію
              </Link>
              <Link href="#" className={styles.mobileMenuLink} onClick={closeMobileMenu}>
                Контакти
              </Link>
              <Link href="/payment-and-delivery" className={styles.mobileMenuLink} onClick={closeMobileMenu}>
                Оплата і доставка
              </Link>
              <Link href="#" className={styles.mobileMenuLink} onClick={closeMobileMenu}>
                Послуги
              </Link>
              <Link href="#" className={styles.mobileMenuLink} onClick={closeMobileMenu}>
                Блог
              </Link>
              <Link href="#" className={styles.mobileMenuLink} onClick={closeMobileMenu}>
                Акції
              </Link>
            </nav>

            <div className={styles.mobileMenuBottom}>
              <a href="tel:0800337049" className={styles.mobilePhone}>
                0 800 33 70 49
              </a>

              <button type="button" className={styles.mobileLocationButton}>
                <img src="/images/icons/location.svg" alt="" className={styles.locationIcon} />
                <span>м.Запоріжжя</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}