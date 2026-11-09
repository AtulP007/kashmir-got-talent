import '../styles/page.css';

export default function PageFrame({ className, id, title }) {
  return (
    <main className={`page ${className}`} id={id}>
      <div className="page__inner">
        <h1 className="page__title">{title}</h1>
      </div>
    </main>
  );
}
