'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link className={path.startsWith(href) ? 'active' : ''} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;
