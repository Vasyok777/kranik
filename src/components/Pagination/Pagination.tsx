import styles from './Pagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, '...', total];
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total];

  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Пагінація">
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Попередня сторінка"
      >
        ‹
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className={styles.dots}>...</span>
        ) : (
          <button
            key={page}
            type="button"
            className={`${styles.page} ${currentPage === page ? styles.active : ''}`}
            onClick={() => onPageChange(page as number)}
            aria-label={`Сторінка ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {String(page).padStart(2, '0')}
          </button>
        )
      )}

      <button
        type="button"
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Наступна сторінка"
      >
        ›
      </button>
    </nav>
  );
}
