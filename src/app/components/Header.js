import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="link">
          <Link href="/">L'agenda</Link>
        </div>
        <div className="link">
          <Link href="/apropos">En savoir plus</Link>
        </div>
        <div className="link">
          <Link href="/organisateur">Espace Organisateur</Link>
        </div>
      </nav>
      <style jsx>{`
        header {
          background: #333;
          padding: 1rem;
          color: #fff;
        }
        nav {
          display: flex;
          justify-content: space-around;
          width: 100%;
        }
        .link {
          width: 30%;
          transition: 1s;
          text-align: center;
        }
        .link:hover {
          text-transform: uppercase;
        }
      `}</style>
    </header>
  );
};

export default Header;
