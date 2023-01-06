import Link from 'next/link';

function Navbar() {
  return (
    <div className="navbar">
      <Link href={'/'}>
        <h1>Hjem</h1>
      </Link>
      <Link href={'/stats'}>
        <h1>Stats</h1>
      </Link>
    </div>
  );
}

export default Navbar;
