"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS,
} from "@/src/data/constants";
import {
  PhoneIcon,
  LocationIcon,
  EmailIcon,
  WhatsAppIcon,
  ViberIcon,
  TelegramIcon,
} from "@/src/components/icons";

const columns = [
  {
    title: "Каталог",
    links: [
      "Змішувачі",
      "Бойлери",
      "Душові системи",
      "Унітази",
      "Інсталяції",
      "Аксесуари",
    ],
  },
  {
    title: "Покупателю",
    links: [
      "Про нас",
      "Контакти",
      "Доставка і оплата",
      "Гарантія",
      "Повернення товару",
    ],
  },
  {
    title: "Інформація",
    links: [
      "Політика конфіденційності",
      "Умови використання",
      "Публічна оферта",
      "Оплата і безпека",
    ],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform 0.25s ease",
        flexShrink: 0,
      }}
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const [openCol, setOpenCol] = useState<string | null>(null);

  const toggle = (title: string) => {
    setOpenCol((prev) => (prev === title ? null : title));
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Desktop grid */}
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/">
              <Image
                src="/assets/logo-white.svg"
                alt="Kranik"
                style={{ height: 'auto' }}
                width={326}
                height={90}
              />
            </Link>
            <div className={styles.socials}>
              <a href="#" className={styles.socialBtn} aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Viber">
                <ViberIcon />
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Telegram">
                <TelegramIcon />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              {col.links.map((link) => (
                <Link key={link} href="#" className={styles.colLink}>
                  {link}
                </Link>
              ))}
            </div>
          ))}

          <div className={`${styles.column} ${styles.contactsCol}`}>
            <a href={PHONE_HREF} className={styles.contactRow}>
              <PhoneIcon size={18} color="rgba(255,255,255,0.65)" />
              <span>{PHONE}</span>
            </a>
            <div className={styles.contactRow}>
              <LocationIcon size={18} color="rgba(255,255,255,0.65)" />
              <span>{ADDRESS}</span>
            </div>
            <a href={EMAIL_HREF} className={styles.contactRow}>
              <EmailIcon size={18} color="rgba(255,255,255,0.65)" />
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Mobile layout */}
        <div className={styles.mobile}>
          <div className={styles.mobileTop}>
            <Link href="/">
              <Image
                src="/assets/logo-white.svg"
                alt="Kranik"
                style={{ height: 'auto' }}
                width={166}
                height={46}
              />
            </Link>
            <div className={styles.socials}>
              <a href="#" className={styles.socialBtn} aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Viber">
                <ViberIcon />
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Telegram">
                <TelegramIcon />
              </a>
            </div>
          </div>

          <div className={styles.accordion}>
            {columns.map((col) => {
              const isOpen = openCol === col.title;
              return (
                <div key={col.title} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.accordionBtn}
                    onClick={() => toggle(col.title)}
                  >
                    <span>{col.title}</span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className={styles.accordionBody}>
                      {col.links.map((link) => (
                        <Link key={link} href="#" className={styles.colLink}>
                          {link}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.mobileContacts}>
            <a href={PHONE_HREF} className={styles.contactRow}>
              <PhoneIcon size={18} color="rgba(255,255,255,0.65)" />
              <span>{PHONE}</span>
            </a>
            <div className={styles.contactRow}>
              <LocationIcon size={18} color="rgba(255,255,255,0.65)" />
              <span>{ADDRESS}</span>
            </div>
            <a href={EMAIL_HREF} className={styles.contactRow}>
              <EmailIcon size={18} color="rgba(255,255,255,0.65)" />
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2025 KRANIK — Всі права захищені.</span>
          <span>Працюємо для вашого комфорту щодня</span>
        </div>
      </div>
    </footer>
  );
}
