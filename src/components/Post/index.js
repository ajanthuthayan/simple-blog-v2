import styles from "./Post.module.css";
import NextLink from "next/link";
import HomeIcon from "../HomeIcon";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
function Post(props) {
  const { author, date, title, body } = props.post;
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
        <Heading>{title}</Heading>
        <Text>{date}</Text>
        <Text>{author}</Text>
        <br />
        <Text>{body}</Text>
      </Box>
      <NextLink href="/" passHref>
        <Button leftIcon={<HomeIcon />} _hover={{ bg: 'teal.200' }}>
          <Heading as="h3" size="md">
            Return
          </Heading>
        </Button>
      </NextLink>
    </div>
  );
}

export default Post;
