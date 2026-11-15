// `eyebrow` is still accepted so the route files keep their props, but it is no longer drawn: the heading names the page.
// eslint-disable-next-line no-unused-vars
export default function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro container"><h1>{title}</h1>{children && <p className="lead">{children}</p>}</section>;
}
