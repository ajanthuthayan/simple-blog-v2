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

import { HamburgerIcon } from "@chakra-ui/icons";

function HamburgerMenu(props) {
  const [size, setSize] = React.useState("xs");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        display={["block", "block", "none", "none"]} 
      />

      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent style={{ backgroundColor: "#319795", color: "#E6FFFA" }}>
          <DrawerCloseButton />
          <DrawerBody>
            <Link>
              <Heading>All Posts</Heading>
            </Link>
            <Link>
              <Heading>Add Post</Heading>
            </Link>
            <Link>
              <Heading>Login</Heading>
            </Link>
            <Link>
              <Heading>Logout</Heading>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default HamburgerMenu;
