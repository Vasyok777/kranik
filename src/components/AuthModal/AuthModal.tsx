'use client';

import { useEffect, useState } from 'react';
import styles from './AuthModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
};

type Errors = {
  loginEmail?: string;
  loginPassword?: string;
  name?: string;
  surname?: string;
  registerPhone?: string;
  email?: string;
  regPassword?: string;
  confirmPassword?: string;
};

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'login',
}: Props) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [registerPhone, setRegisterPhone] = useState('+380');
  const [email, setEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
    setErrors({});
    setSubmitted(false);
  }, [defaultTab]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isEmailValid = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').replace(/^380/, '');

    let result = '+380';

    if (digits.length > 0) result += ' ' + digits.substring(0, 2);
    if (digits.length >= 3) result += ' ' + digits.substring(2, 5);
    if (digits.length >= 6) result += '-' + digits.substring(5, 7);
    if (digits.length >= 8) result += '-' + digits.substring(7, 9);

    return result;
  };

  const validateLogin = () => {
    const newErrors: Errors = {};

    if (!phone.trim()) {
      newErrors.loginEmail = 'Будь ласка, заповніть дане поле';
    } else if (!isEmailValid(phone)) {
      newErrors.loginEmail = 'Будь ласка, введіть коректну електронну пошту';
    }

    if (!password.trim()) {
      newErrors.loginPassword = 'Будь ласка, заповніть дане поле';
    }

    return newErrors;
  };

  const validateRegister = () => {
    const newErrors: Errors = {};
    const phoneDigits = registerPhone.replace(/\D/g, '');

    if (!name.trim()) {
      newErrors.name = 'Будь ласка, заповніть дане поле';
    }

    if (!surname.trim()) {
      newErrors.surname = 'Будь ласка, заповніть дане поле';
    }

    if (!registerPhone.trim() || registerPhone === '+380') {
      newErrors.registerPhone = 'Будь ласка, заповніть дане поле';
    } else if (phoneDigits.length !== 12) {
      newErrors.registerPhone = 'Будь ласка, введіть повний номер телефону';
    }

    if (!email.trim()) {
      newErrors.email = 'Будь ласка, заповніть дане поле';
    } else if (!isEmailValid(email)) {
      newErrors.email = 'Будь ласка, введіть коректну електронну пошту';
    }

    if (!regPassword.trim()) {
      newErrors.regPassword = 'Будь ласка, заповніть дане поле';
    } else if (regPassword.length < 6) {
      newErrors.regPassword = 'Пароль має містити мінімум 6 символів';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Будь ласка, заповніть дане поле';
    } else if (confirmPassword !== regPassword) {
      newErrors.confirmPassword = 'Паролі не співпадають';
    }

    return newErrors;
  };

  const loginErrors = validateLogin();
  const registerErrors = validateRegister();

  const isLoginReady = Object.keys(loginErrors).length === 0;
  const isRegisterReady = Object.keys(registerErrors).length === 0;

  const isButtonActive =
    activeTab === 'login' ? isLoginReady : isRegisterReady;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors =
      activeTab === 'login' ? validateLogin() : validateRegister();

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log(activeTab === 'login' ? 'Успішний вхід' : 'Успішна реєстрація');
  };

  const showError = (field: keyof Errors) => {
    return submitted && errors[field];
  };

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === 'login' ? styles.tabLoginActive : ''
            }`}
            onClick={() => handleTabChange('login')}
          >
            Вхід
          </button>

          <button
            type="button"
            className={`${styles.tab} ${
              activeTab === 'register' ? styles.tabRegisterActive : ''
            }`}
            onClick={() => handleTabChange('register')}
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

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {activeTab === 'login' ? (
            <>
              <label className={styles.label}>Електронна пошта *</label>
              <input
                type="text"
                placeholder="Введіть електронну пошту"
                className={`${styles.input} ${
                  showError('loginEmail') ? styles.inputError : ''
                }`}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (submitted) setErrors(validateLogin());
                }}
              />
              {showError('loginEmail') && (
                <p className={styles.errorText}>{errors.loginEmail}</p>
              )}

              <label className={styles.label}>Пароль *</label>
              <div
                className={`${styles.passwordWrap} ${
                  showError('loginPassword') ? styles.passwordErrorWrap : ''
                }`}
              >
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Введіть пароль"
                  className={`${styles.input} ${styles.passwordInput} ${
                    showError('loginPassword') ? styles.inputError : ''
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (submitted) setErrors(validateLogin());
                  }}
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowLoginPassword((prev) => !prev)}
                >
                  <img
                    src={
                      showLoginPassword
                        ? '/images/icons/eye-open.svg'
                        : '/images/icons/eye-close.svg'
                    }
                    alt=""
                    className={styles.eyeIcon}
                  />
                </button>
              </div>
              {showError('loginPassword') && (
                <p className={styles.errorText}>{errors.loginPassword}</p>
              )}

              <button type="button" className={styles.forgotButton}>
                Забули пароль?
              </button>

              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isButtonActive ? styles.submitButtonActive : ''
                }`}
              >
                Увійти
              </button>
            </>
          ) : (
            <>
              <label className={styles.label}>Ім’я *</label>
              <input
                type="text"
                placeholder="Ваше ім’я"
                className={`${styles.input} ${
                  showError('name') ? styles.inputError : ''
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (submitted) setErrors(validateRegister());
                }}
              />
              {showError('name') && (
                <p className={styles.errorText}>{errors.name}</p>
              )}

              <label className={styles.label}>Прізвище *</label>
              <input
                type="text"
                placeholder="Ваше прізвище"
                className={`${styles.input} ${
                  showError('surname') ? styles.inputError : ''
                }`}
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                  if (submitted) setErrors(validateRegister());
                }}
              />
              {showError('surname') && (
                <p className={styles.errorText}>{errors.surname}</p>
              )}

              <label className={styles.label}>Номер телефону *</label>
              <input
                type="tel"
                placeholder="+380 99 000-00-00"
                className={`${styles.input} ${
                  showError('registerPhone') ? styles.inputError : ''
                }`}
                value={registerPhone}
                onChange={(e) => {
                  const val = e.target.value;

                  if (!val.startsWith('+380')) return;

                  setRegisterPhone(formatPhone(val));
                  if (submitted) setErrors(validateRegister());
                }}
                onKeyDown={(e) => {
                  if (
                    (e.key === 'Backspace' || e.key === 'Delete') &&
                    registerPhone.length <= 4
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              {showError('registerPhone') && (
                <p className={styles.errorText}>{errors.registerPhone}</p>
              )}

              <label className={styles.label}>Електронна пошта *</label>
              <input
                type="email"
                placeholder="Ваша електронна пошта"
                className={`${styles.input} ${
                  showError('email') ? styles.inputError : ''
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitted) setErrors(validateRegister());
                }}
              />
              {showError('email') && (
                <p className={styles.errorText}>{errors.email}</p>
              )}

              <label className={styles.label}>Пароль *</label>
              <div
                className={`${styles.passwordWrap} ${
                  showError('regPassword') ? styles.passwordErrorWrap : ''
                }`}
              >
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  placeholder="Введіть пароль"
                  className={`${styles.input} ${styles.passwordInput} ${
                    showError('regPassword') ? styles.inputError : ''
                  }`}
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    if (submitted) setErrors(validateRegister());
                  }}
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowRegPassword((prev) => !prev)}
                >
                  <img
                    src={
                      showRegPassword
                        ? '/images/icons/eye-open.svg'
                        : '/images/icons/eye-close.svg'
                    }
                    alt=""
                    className={styles.eyeIcon}
                  />
                </button>
              </div>
              {showError('regPassword') && (
                <p className={styles.errorText}>{errors.regPassword}</p>
              )}

              <label className={styles.label}>Підтвердити пароль *</label>
              <div
                className={`${styles.passwordWrap} ${
                  showError('confirmPassword') ? styles.passwordErrorWrap : ''
                }`}
              >
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Введіть повторно пароль"
                  className={`${styles.input} ${styles.passwordInput} ${
                    showError('confirmPassword') ? styles.inputError : ''
                  }`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (submitted) setErrors(validateRegister());
                  }}
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <img
                    src={
                      showConfirmPassword
                        ? '/images/icons/eye-open.svg'
                        : '/images/icons/eye-close.svg'
                    }
                    alt=""
                    className={styles.eyeIcon}
                  />
                </button>
              </div>
              {showError('confirmPassword') && (
                <p className={styles.errorText}>{errors.confirmPassword}</p>
              )}

              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isButtonActive ? styles.submitButtonActive : ''
                }`}
              >
                Зареєструватися
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}