import dynamic from "next/dynamic";
import styles from "./Nav.module.css";
import { Heading, useMediaQuery, Link, Box } from "@chakra-ui/react";
import HamburgerMenu from "../HamburgerMenu";
import NextLink from "next/link";

function Nav(props) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const links = [
    { name: "All Posts", route: "/" },
    { name: "Add Post", route: "/add-post" },
    { name: "Login", route: "/login" },
    { name: "Logout", route: "/logout" },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles["nav-container"]}>
        <Box>
          <Heading>Simple Blog</Heading>
        </Box>
        <Box>
          <Box
            display={["none", "none", "flex", "flex"]}
            gap={2}
            fontSize={"1.25rem"}
          >
            {links.map((link, index) => (
              <NextLink key={index} href={link.route} passHref>
                <Link>{link.name}</Link>
              </NextLink>
            ))}
          </Box>
          <Box display={["flex", "flex", "none", "none"]}>
            <HamburgerMenu links={links}/>
          </Box>
        </Box>
      </div>
    </nav>
  );
}

export default Nav;
