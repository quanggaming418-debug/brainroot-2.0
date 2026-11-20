import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Locale } from '../../i18n/I18nContext';
import {
  OFFLINE_FAQ_ENTRIES,
  TOD_ASSETS,
  answerBrainieFaq,
  getTruthOrDareUiCopy,
} from './truthOrDareData';

interface BrainieFaqPopoverProps {
  readonly locale: Locale;
  readonly reducedMotion: boolean;
}

interface ChatMessage {
  readonly id: string;
  readonly sender: 'brainie' | 'user';
  readonly text: string;
}

export function BrainieFaqPopover({
  locale,
  reducedMotion,
}: BrainieFaqPopoverProps) {
  const copy = getTruthOrDareUiCopy(locale);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, open]);

  const askQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}-${Math.random()}`,
      sender: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    const reply = answerBrainieFaq(trimmed, locale);
    if (reducedMotion) {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}-${Math.random()}`,
          sender: 'brainie',
          text: reply.text,
        },
      ]);
      return;
    }

    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}-${Math.random()}`,
          sender: 'brainie',
          text: reply.text,
        },
      ]);
    }, 260);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    askQuestion(inputValue);
  };

  return (
    <div className="tod-bot-anchor">
      {open ? (
        <section
          className="tod-bot-popover"
          aria-label={copy.botTitle}
          data-testid="tod-bot-popover"
        >
          <img
            className="tod-bot-popover__border"
            src={TOD_ASSETS.chatPanelBorder}
            alt=""
            aria-hidden="true"
          />

          <div className="tod-bot-popover__inner">
            <header className="tod-bot-header">
              <div className="tod-bot-header__id">
                <img
                  src={TOD_ASSETS.brainieMascot}
                  alt="Brainie"
                  width={38}
                  height={38}
                  className="tod-bot-header__avatar"
                />
                <div>
                  <h2 className="tod-bot-header__title">{copy.botTitle}</h2>
                  <span
                    className="tod-bot-offline-pill"
                    data-testid="tod-bot-offline-badge"
                  >
                    {copy.botOfflineBadge}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="tod-bot-close"
                aria-label={copy.botCloseAria}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </header>

            <div className="tod-bot-messages" ref={scrollRef} aria-live="polite">
              <div className="tod-bot-bubble tod-bot-bubble--brainie">
                {copy.botIntro}
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`tod-bot-bubble tod-bot-bubble--${msg.sender}`}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping ? (
                <div className="tod-bot-bubble tod-bot-bubble--brainie tod-bot-bubble--typing">
                  <img
                    src={TOD_ASSETS.typingDots}
                    alt="..."
                    width={42}
                    height={14}
                  />
                </div>
              ) : null}
            </div>

            <div className="tod-bot-suggestions">
              {OFFLINE_FAQ_ENTRIES.slice(0, 3).map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className="tod-bot-chip"
                  data-testid={`tod-bot-chip-${entry.id}`}
                  onClick={() => askQuestion(entry.question[locale])}
                >
                  {entry.question[locale]}
                </button>
              ))}
            </div>

            <form className="tod-bot-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="tod-bot-input"
                value={inputValue}
                placeholder={copy.botInputPlaceholder}
                aria-label={copy.botInputPlaceholder}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="tod-bot-send"
                data-testid="tod-bot-send"
              >
                {copy.botSendLabel}
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="tod-bot-fab"
        data-testid="tod-bot-trigger"
        aria-label={copy.botButtonAria}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={TOD_ASSETS.brainieMascot}
          alt="Brainie"
          width={58}
          height={58}
          draggable={false}
        />
      </button>
    </div>
  );
}
