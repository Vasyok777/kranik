import Image from 'next/image';
import { brands } from '@/src/data/store';
import styles from './BrandsRow.module.scss';


export default function BrandsRow() {
  return (
    <div className={`container ${styles.brandsRow}`}>
      {brands.map((brand, index) => (
        <div className={styles.brandItem} key={index}>
          <Image
            src={`/assets/brands/${brand}`}
            alt={`brand-${index + 1}`}
            width={110}
            height={40}
            className={styles.brandImage}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}