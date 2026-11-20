import { publicUrl } from '../utils/publicUrl';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { getNotFoundCopy } from '../i18n/siteCopy';

export function NotFoundPage() {
  const { locale } = useI18n();
  const copy = getNotFoundCopy(locale);

  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <div className="not-found__card">
        <div className="not-found__leaves" aria-hidden="true">
          <img
            src={publicUrl('/assets/hero-v4/floating-leaf-sage.svg')}
            alt=""
            width={40}
            height={40}
          />
          <img
            src={publicUrl('/assets/hero-v4/floating-leaf-peach.svg')}
            alt=""
            width={34}
            height={34}
          />
        </div>
        <p className="gp-eyebrow">{copy.eyebrow}</p>
        <h1 className="not-found__heading" id="not-found-heading">
          {copy.heading}
        </h1>
        <p className="not-found__body">{copy.body}</p>
        <div className="not-found__actions">
          <Link className="gp-button gp-button--primary" to="/">
            {copy.homeBtn}
          </Link>
          <Link className="gp-button gp-button--secondary" to="/games">
            {copy.gamesBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}
