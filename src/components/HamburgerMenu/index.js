import React from "react";
import styles from "./HamburgerMenu.module.css";
import {
  Heading,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Button,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

function HamburgerMenu(props) {
  const { authLinks, noAuthLinks } = props;
  const [size, setSize] = React.useState("xs");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const handleClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  return (
    <div>
      <Button
        onClick={() => handleClick(size)}
        key={size}
        m={4}
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        style={{ backgroundColor: "#E6FFFA", color: "#1D4044" }}
      />

      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent style={{ backgroundColor: "#319795", color: "#E6FFFA" }}>
          <DrawerCloseButton />
          <DrawerBody>
            {isLoggedIn &&
              authLinks.map((link, index) => (
                <NextLink key={index} href={link.route} passHref>
                  <Link onClick={link.onClick}>
                    <Heading>{link.name}</Heading>
                  </Link>
                </NextLink>
              ))}
            {!isLoggedIn &&
              noAuthLinks.map((link, index) => (
                <NextLink key={index} href={link.route} passHref>
                  <Link>
                    <Heading>{link.name}</Heading>
                  </Link>
                </NextLink>
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default HamburgerMenu;
