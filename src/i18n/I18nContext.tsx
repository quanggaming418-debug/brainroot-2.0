import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getSiteMetaDescription } from './siteCopy';

export type Locale = 'vi' | 'en';

export const LOCALE_STORAGE_KEY = 'brainroot.locale.v1';

export function isSupportedLocale(value: unknown): value is Locale {
  return value === 'vi' || value === 'en';
}

export function resolveInitialLocale(
  storage?: Pick<Storage, 'getItem'>,
): Locale {
  if (!storage) return 'vi';
  try {
    const saved = storage.getItem(LOCALE_STORAGE_KEY);
    if (isSupportedLocale(saved)) {
      return saved;
    }
  } catch {
    // Ignore restricted storage environments.
  }
  return 'vi';
}

export function persistLocale(
  locale: Locale,
  storage?: Pick<Storage, 'setItem'>,
): void {
  if (!storage) return;
  try {
    storage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage quota / private-mode restrictions.
  }
}

interface I18nContextValue {
  readonly locale: Locale;
  readonly setLocale: (next: Locale) => void;
  readonly toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'vi',
  setLocale: () => {},
  toggleLocale: () => {},
});

interface I18nProviderProps {
  readonly children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    resolveInitialLocale(
      typeof window !== 'undefined' ? window.localStorage : undefined,
    ),
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(
      next,
      typeof window !== 'undefined' ? window.localStorage : undefined,
    );
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === 'vi' ? 'en' : 'vi';
      persistLocale(
        next,
        typeof window !== 'undefined' ? window.localStorage : undefined,
      );
      return next;
    });
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    const desc = getSiteMetaDescription(locale);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
