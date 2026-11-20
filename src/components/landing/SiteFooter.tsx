import { FOOTER_CONTENT } from '../../data/landing';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>{FOOTER_CONTENT.text}</p>
    </footer>
  );
}
