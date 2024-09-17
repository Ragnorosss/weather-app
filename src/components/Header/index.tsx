import Link from 'next/link';
import Aside from '../Aside';
import styles from './header.module.scss';
const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'} style={{textDecoration:"none", color:"inherit"}}>Weather-app</Link>
      <Aside />
    </header>
  );
};

export default Header;
