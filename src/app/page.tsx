export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">AVANTECH / FOUNDATION</p>
        <h1>AvanTech</h1>
        <p className="lead">A premium technology and gaming commerce platform, built RTL-first.</p>
      </section>
      <section className="grid" aria-label="Brand worlds">
        {['Apple', 'PlayStation', 'Xbox', 'Nintendo', 'Meta / XR'].map((brand) => (
          <article className="card" key={brand}>
            <span>{brand}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
