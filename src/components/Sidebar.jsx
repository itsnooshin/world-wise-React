import Logo from './Logo';
import AppNav from './AppNav';
import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';
// import Appnav from './Appnav';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* <p>list of cities</p> */}
      <Outlet/>
      <footer className={styles.footer}>
        <p className= {styles.copyright}>
        &copy; Copyright {new Date().getFullYear()}  by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
