import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Kranik.ua - Інтернет-магазин',
  description: 'Стартовий шаблон інтернет-магазину на Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
