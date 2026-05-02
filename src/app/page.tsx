'use client';

import { useState } from 'react';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import HeroSection from '@/src/components/HeroSection/HeroSection';
import BrandsRow from '@/src/components/BrandsRow/BrandsRow';
import ProductSection from '@/src/components/ProductSection/ProductSection';
import BlogSection from '@/src/components/BlogSection/BlogSection';
import AboutUs from '@/src/components/AboutUsShort/AboutUs';
import AuthModal from '@/src/components/AuthModal/AuthModal';
import { hitProducts, popularProducts, saleProducts } from '@/src/data/store';
import styles from './page.module.scss';

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const openLoginModal = () => {
    setAuthTab('login');
    setIsAuthOpen(true);
  };

  const openRegisterModal = () => {
    setAuthTab('register');
    setIsAuthOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
  };

  return (
    <main className={`page-root ${styles.homePage}`}>
      <Header
        onOpenLogin={openLoginModal}
        onOpenRegister={openRegisterModal}
      />

      <div className={styles.content}>
        <HeroSection />
        <BrandsRow />

        <ProductSection
          title="Популярні товари"
          linkLabel="Ще 32 товара"
          products={popularProducts}
        />

        <ProductSection
          title="Акції та знижки"
          linkLabel="Ще 32 товара"
          products={saleProducts}
        />

        <ProductSection
          title="Хіти продажів"
          linkLabel="Ще 32 товара"
          products={hitProducts}
        />

        <BlogSection />
        <AboutUs />
      </div>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuthModal}
        defaultTab={authTab}
      />
    </main>
  );
}