import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
        <Link href="/" className="navbar-brand">
          Estoque
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link href="/sales" className="navbar-brand">
          Vendas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
