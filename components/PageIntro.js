export default function PageIntro({ eyebrow, title, children }) {
  return <section className="page-intro"><p className="eyebrow green">{eyebrow}</p><h1>{title}</h1>{children && <p>{children}</p>}</section>;
}
