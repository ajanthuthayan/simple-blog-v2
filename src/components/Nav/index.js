import styles from "./Nav.module.css";
import { Heading } from "@chakra-ui/react";
import HamburgerMenu from "../HamburgerMenu";

function Nav(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles["nav-container"]}>
        <Heading>Simple Blog</Heading>
        <HamburgerMenu />
      </div>
    </nav>
  );
}

export default Nav;
