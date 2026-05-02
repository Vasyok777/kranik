'use client';

import { useEffect, useState } from 'react';
import styles from './AuthModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
};

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'login',
}: Props) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.trim()) {
      setShowError(true);
      return;
    }

    setShowError(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === 'login' ? styles.tabLoginActive : ''
            }`}
            onClick={() => setActiveTab('login')}
          >
            Вхід
          </button>

          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === 'register' ? styles.tabRegisterActive : ''
            }`}
            onClick={() => setActiveTab('register')}
          >
            Реєстрація
          </button>
        </div>

        <div className={styles.lines}>
          <span
            className={`${styles.lineHalf} ${
              activeTab === 'login' ? styles.lineOrange : styles.lineGray
            }`}
          />
          <span
            className={`${styles.lineHalf} ${
              activeTab === 'register' ? styles.lineBlue : styles.lineGray
            }`}
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Номер телефону *</label>
          <input
            type="text"
            placeholder="Ваш номер телефону"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label className={styles.label}>Пароль *</label>
          <input
            type="password"
            placeholder="Ваш пароль"
            className={`${styles.input} ${showError ? styles.inputError : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.trim()) {
                setShowError(false);
              }
            }}
          />

          {showError && (
            <p className={styles.errorText}>Тут повинен бути ваш пароль</p>
          )}

          {activeTab === 'login' ? (
            <button type="button" className={styles.forgotButton}>
              Забули пароль?
            </button>
          ) : (
            <button type="button" className={styles.forgotButton}>
              Уже маєте акаунт?
            </button>
          )}

          <button type="submit" className={styles.submitButton}>
            {activeTab === 'login' ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
      </div>
    </div>
  );
}