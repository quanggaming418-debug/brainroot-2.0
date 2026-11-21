import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '../../i18n/I18nContext';
import {
  RULEBOOK_SPREADS,
  TOD_ASSETS,
  getTruthOrDareUiCopy,
  type RulebookSpread,
} from './truthOrDareData';
import { useModalFocus } from './useModalFocus';

interface HardcoverRulebookModalProps {
  readonly open: boolean;
  readonly locale: Locale;
  readonly reducedMotion: boolean;
  readonly onClose: () => void;
}

interface MobileRulePage {
  readonly pageNumber: number;
  readonly kind: 'left' | 'right';
  readonly spread: RulebookSpread;
}

const MOBILE_PAGES: readonly MobileRulePage[] = RULEBOOK_SPREADS.flatMap(
  (spread) => [
    { pageNumber: spread.leftPageNumber, kind: 'left' as const, spread },
    { pageNumber: spread.rightPageNumber, kind: 'right' as const, spread },
  ],
);

export function HardcoverRulebookModal({
  open,
  locale,
  reducedMotion,
  onClose,
}: HardcoverRulebookModalProps) {
  const copy = getTruthOrDareUiCopy(locale);
  const [isBookOpened, setIsBookOpened] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [mobilePageIndex, setMobilePageIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(
    null,
  );
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const turnTimerRef = useRef<number | null>(null);
  useModalFocus(open, shellRef);

  useEffect(
    () => () => {
      if (turnTimerRef.current !== null) {
        window.clearTimeout(turnTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const syncWidth = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', syncWidth, { passive: true });
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  // Reset to cover briefly when opened, or open cleanly
  useEffect(() => {
    if (!open) {
      setIsBookOpened(false);
      setSpreadIndex(0);
      setMobilePageIndex(0);
      setTurnDirection(null);
      return;
    }
    const timer = window.setTimeout(
      () => {
        setIsBookOpened(true);
        closeBtnRef.current?.focus({ preventScroll: true });
      },
      reducedMotion ? 40 : 420,
    );
    return () => window.clearTimeout(timer);
  }, [open, reducedMotion]);

  const triggerTurn = useCallback(
    (dir: 'next' | 'prev') => {
      if (!reducedMotion) {
        setTurnDirection(dir);
        if (turnTimerRef.current !== null) {
          window.clearTimeout(turnTimerRef.current);
        }
        turnTimerRef.current = window.setTimeout(() => {
          turnTimerRef.current = null;
          setTurnDirection(null);
        }, 380);
      }
      if (isMobileView) {
        setMobilePageIndex((prev) =>
          dir === 'next'
            ? Math.min(MOBILE_PAGES.length - 1, prev + 1)
            : Math.max(0, prev - 1),
        );
      } else {
        setSpreadIndex((prev) =>
          dir === 'next'
            ? Math.min(RULEBOOK_SPREADS.length - 1, prev + 1)
            : Math.max(0, prev - 1),
        );
      }
    },
    [isMobileView, reducedMotion],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowRight' && isBookOpened) {
        event.preventDefault();
        triggerTurn('next');
      } else if (event.key === 'ArrowLeft' && isBookOpened) {
        event.preventDefault();
        triggerTurn('prev');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, isBookOpened, onClose, triggerTurn]);

  if (!open) return null;

  const activeSpread = RULEBOOK_SPREADS[spreadIndex] ?? RULEBOOK_SPREADS[0];
  const activeMobile = MOBILE_PAGES[mobilePageIndex] ?? MOBILE_PAGES[0];
  const totalPages = MOBILE_PAGES.length;

  const canPrev = isMobileView ? mobilePageIndex > 0 : spreadIndex > 0;
  const canNext = isMobileView
    ? mobilePageIndex < MOBILE_PAGES.length - 1
    : spreadIndex < RULEBOOK_SPREADS.length - 1;

  const renderIllustration = (
    mascot: RulebookSpread['left']['mascot'],
  ) => {
    if (mascot === 'both') {
      return (
        <div className="tod-book-art tod-book-art--both">
          <img src={TOD_ASSETS.brainieMascot} alt="Brainie" width={94} height={94} />
          <img src={TOD_ASSETS.rootieMascot} alt="Rootie" width={94} height={94} />
        </div>
      );
    }
    if (mascot === 'brainie') {
      return (
        <div className="tod-book-art">
          <img src={TOD_ASSETS.brainieMascot} alt="Brainie" width={114} height={114} />
        </div>
      );
    }
    if (mascot === 'rootie') {
      return (
        <div className="tod-book-art">
          <img src={TOD_ASSETS.rootieMascot} alt="Rootie" width={114} height={114} />
        </div>
      );
    }
    return (
      <div className="tod-book-art tod-book-art--wheel">
        <img src={TOD_ASSETS.mysteryWheel} alt="" width={114} height={114} />
      </div>
    );
  };

  const renderLeftPage = (spread: RulebookSpread) => (
    <div className="tod-book-page tod-book-page--left">
      <img
        className="tod-book-page__bg"
        src={TOD_ASSETS.bookPageBlank}
        alt=""
        aria-hidden="true"
      />
      <img
        className="tod-book-page__tape"
        src={TOD_ASSETS.washiTape}
        alt=""
        aria-hidden="true"
      />
      <div className="tod-book-page__content">
        <p className="tod-book-kicker">{spread.left.kicker[locale]}</p>
        <h3 className="tod-book-heading">{spread.left.title[locale]}</h3>
        {renderIllustration(spread.left.mascot)}
        <p className="tod-book-body">{spread.left.body[locale]}</p>
        <span className="tod-book-pagenum">
          {copy.rulebookPageLabel(spread.leftPageNumber)}
        </span>
      </div>
    </div>
  );

  const renderRightPage = (spread: RulebookSpread) => (
    <div className="tod-book-page tod-book-page--right">
      <img
        className="tod-book-page__bg"
        src={TOD_ASSETS.bookPageBlank}
        alt=""
        aria-hidden="true"
      />
      <img
        className="tod-book-page__leaf"
        src={TOD_ASSETS.leafSprig}
        alt=""
        aria-hidden="true"
      />
      <div className="tod-book-page__content">
        <p className="tod-book-kicker">{spread.right.kicker[locale]}</p>
        <h3 className="tod-book-heading">{spread.right.title[locale]}</h3>
        <ul className="tod-book-list">
          {spread.right.points.map((pt) => (
            <li key={pt.en}>{pt[locale]}</li>
          ))}
        </ul>
        <p className="tod-book-footnote">{spread.right.footnote[locale]}</p>
        <span className="tod-book-pagenum">
          {copy.rulebookPageLabel(spread.rightPageNumber)}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="tod-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tod-rulebook-title"
      data-testid="tod-rulebook-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="tod-rulebook-shell" ref={shellRef} tabIndex={-1}>
        <div className="tod-rulebook-topbar">
          <h2 className="tod-rulebook-title" id="tod-rulebook-title">
            {copy.rulebookTitle}
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="tod-icon-close"
            data-testid="tod-rulebook-close"
            aria-label={copy.rulebookClose}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <p className="tod-rulebook-draft" data-testid="tod-rulebook-draft">
          {copy.rulebookDraftNotice}
        </p>

        {!isBookOpened ? (
          <button
            type="button"
            className="tod-book-cover"
            data-testid="tod-rulebook-cover"
            onClick={() => setIsBookOpened(true)}
          >
            <img
              className="tod-book-cover__bg"
              src={TOD_ASSETS.bookCoverBlank}
              alt=""
              aria-hidden="true"
            />
            <div className="tod-book-cover__overlay">
              <img
                className="tod-book-cover__sparkles"
                src={TOD_ASSETS.sparkles}
                alt=""
                aria-hidden="true"
              />
              <span className="tod-book-cover__kicker">BRAINROOT</span>
              <strong className="tod-book-cover__heading">Truth or Dare</strong>
              <span className="tod-book-cover__cta">
                {copy.rulebookOpenHint}
              </span>
            </div>
          </button>
        ) : (
          <div className="tod-book-open-wrap">
            <div
              className={`tod-book-spread${
                isMobileView ? ' is-single' : ' is-double'
              }${turnDirection ? ` is-turning-${turnDirection}` : ''}`}
              data-testid="tod-rulebook-spread"
            >
              {isMobileView ? (
                activeMobile.kind === 'left' ? (
                  renderLeftPage(activeMobile.spread)
                ) : (
                  renderRightPage(activeMobile.spread)
                )
              ) : (
                <>
                  {renderLeftPage(activeSpread)}
                  <div className="tod-book-spine" aria-hidden="true" />
                  {renderRightPage(activeSpread)}
                </>
              )}
            </div>

            <div className="tod-rulebook-controls">
              <button
                type="button"
                className="tod-btn tod-btn--ghost"
                data-testid="tod-rulebook-prev"
                disabled={!canPrev}
                onClick={() => triggerTurn('prev')}
              >
                ← {copy.rulebookPrevPage}
              </button>

              <span className="tod-rulebook-counter" data-testid="tod-rulebook-counter">
                {isMobileView
                  ? copy.rulebookMobilePageLabel(
                      activeMobile.pageNumber,
                      totalPages,
                    )
                  : copy.rulebookSpreadLabel(
                      activeSpread.leftPageNumber,
                      activeSpread.rightPageNumber,
                      totalPages,
                    )}
              </span>

              <button
                type="button"
                className="tod-btn tod-btn--primary"
                data-testid="tod-rulebook-next"
                disabled={!canNext}
                onClick={() => triggerTurn('next')}
              >
                {copy.rulebookNextPage} →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
