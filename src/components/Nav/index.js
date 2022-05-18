import { useEffect } from "react";
import styles from "./Nav.module.css";
import { Heading, Link, Box } from "@chakra-ui/react";
import HamburgerMenu from "../HamburgerMenu";
import NextLink from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../app/auth-slice";

import { useSession, signOut } from "next-auth/react";

function Nav(props) {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if (session) {
      dispatch(login());
    }
  }, [dispatch, session]);

  const logoutHandler = () => {
    dispatch(logout());
    signOut({ redirect: false });
  };

  const authLinks = [
    { name: "All Posts", route: "/", authRequired: null },
    { name: "Add Post", route: "/add-post" },
    { name: "Logout", route: "/", onClick: logoutHandler },
  ];

  const noAuthLinks = [
    { name: "All Posts", route: "/", authRequired: null },
    { name: "Login", route: "/login" },
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
            {isLoggedIn &&
              authLinks.map((link, index) => (
                <NextLink key={index} href={link.route} passHref>
                  <Link onClick={link.onClick}>{link.name}</Link>
                </NextLink>
              ))}
            {!isLoggedIn &&
              noAuthLinks.map((link, index) => (
                <NextLink key={index} href={link.route} passHref>
                  <Link>{link.name}</Link>
                </NextLink>
              ))}
          </Box>
          <Box display={["flex", "flex", "none", "none"]}>
            <HamburgerMenu authLinks={authLinks} noAuthLinks={noAuthLinks} />
          </Box>
        </Box>
      </div>
    </nav>
  );
}

export default Nav;
