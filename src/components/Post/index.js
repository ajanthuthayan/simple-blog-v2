import { useState } from "react";
import styles from "./Post.module.css";
import NextLink from "next/link";
import HomeIcon from "../HomeIcon";
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

function Post(props) {
  const { _id: postid, author, date, title, body, authorized } = props.post;
  const [edittingMode, setEdittingMode] = useState(false);

  const router = useRouter();

  const deletePostHandler = async () => {
    console.log(postid);

    try {
      const response = await fetch("/api/user/deletePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid: postid,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      router.push("/");
    } catch (error) {
      return Promise.reject("An Error Occurred");
    }
  };

  return (
    <div className={styles.container}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        minWidth="450px"
        width="80vw"
        maxWidth="1000px"
        marginTop="4rem"
        marginBottom="2rem"
        padding="2rem"
      >
        {authorized && (
          <Flex justifyContent="flex-end">
            <ButtonGroup>
              <Button colorScheme="gray" size="xs">
                EDIT
              </Button>
              <Button colorScheme="red" size="xs" onClick={deletePostHandler}>
                DELETE
              </Button>
            </ButtonGroup>
          </Flex>
        )}
        <Heading>{title}</Heading>
        <Text>{date}</Text>
        <Text>{author}</Text>
        <br />
        <Text>{body}</Text>
      </Box>
      <NextLink href="/" passHref>
        <Button leftIcon={<HomeIcon />} _hover={{ bg: "teal.200" }}>
          <Heading as="h3" size="md">
            Return
          </Heading>
        </Button>
      </NextLink>
    </div>
  );
}

export default Post;
