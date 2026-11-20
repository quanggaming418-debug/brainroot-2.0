import { ABOUT_CONTENT } from '../../data/landing';

export function AboutSection() {
  return (
    <section
      className="about"
      id={ABOUT_CONTENT.id}
      tabIndex={-1}
      aria-labelledby="about-heading"
    >
      <p className="section-overline">{ABOUT_CONTENT.overline}</p>
      <h2 className="section-heading" id="about-heading">
        {ABOUT_CONTENT.heading}
      </h2>
      <p className="about__mission">{ABOUT_CONTENT.mission}</p>
      <p className="about__body">{ABOUT_CONTENT.body}</p>
    </section>
  );
}
