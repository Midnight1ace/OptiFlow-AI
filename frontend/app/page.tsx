import Link from "next/link";

const highlights = [
  "Live queue visibility across departments",
  "Rule-based decisions for immediate staffing moves",
  "A clean path toward real-time updates and predictive AI"
];

export default function HomePage() {
  return (
    <main className="landing-shell">
      <section className="hero-panel">
        <p className="eyebrow">Healthcare Operations Command</p>
        <h1>OptiFlow AI keeps patient flow visible and staffing decisions fast.</h1>
        <p className="hero-copy">
          Start with an MVP dashboard, feed it queue snapshots, and let the rules
          engine surface the next best action for your team.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" href="/dashboard">
            Open Dashboard
          </Link>
          <a className="text-link" href="http://localhost:8000/docs">
            FastAPI Docs
          </a>
        </div>
      </section>

      <section className="info-grid">
        {highlights.map((item) => (
          <article className="info-card" key={item}>
            <p>{item}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
