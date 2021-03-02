import { node } from "prop-types";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cajero Automático TASI</h1>
      </header>
      {children}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: node.isRequired,
};
