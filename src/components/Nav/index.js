import dynamic from "next/dynamic";
import styles from "./Nav.module.css";
import { Heading, useMediaQuery, Link, Box } from "@chakra-ui/react";
import HamburgerMenu from "../HamburgerMenu";
import NextLink from "next/link";

function Nav(props) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <nav className={styles.nav}>
      <div className={styles["nav-container"]}>
        <Box>
          <Heading>Simple Blog</Heading>
        </Box>
        <Box>
          <Box display={["none", "none", "flex", "flex"]} gap={2} fontSize={"1.25rem"}>
            <NextLink href="/" passHref>
              <Link>All Posts</Link>
            </NextLink>
            <NextLink href="/add-post" passHref>
              <Link>Add Post</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
            <NextLink href="/logout">
              <Link>Logout</Link>
            </NextLink>
          </Box>
          <Box display={["flex", "flex", "none", "none"]}>
            <HamburgerMenu />
          </Box>
        </Box>
      </div>
    </nav>
  );
}

export default Nav;
