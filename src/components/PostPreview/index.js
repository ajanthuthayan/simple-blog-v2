import styles from "./PostPreview.module.css";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  ButtonGroup,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/router";

function PostPreview(props) {
  const { id, title, body, authorized } = props;
  const router = useRouter();

  const editPostHandler = () => {
    console.log("clicked")
    router.push(`/posts/${id}?edit=true`)
  }


  const deletePostHandler = async () => {
    try {
      const response = await fetch("/api/user/deletePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid: id,
        }),
      });

      router.reload();

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      return Promise.reject("An Error Occurred");
    }
  };

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="90vw"
      minWidth="400px"
      maxWidth="1000px"
      padding="2rem"
      flexDirection="column"
      className={styles["card-container"]}
    >
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box minWidth="80%" padding="0">
          <Link href={`/posts/${id}`} noOfLines={1}>
            <Heading as="h4" size="md" display="inline">
              {title}
            </Heading>
          </Link>
        </Box>
        {authorized && (
          <Box maxWidth="40%">
            <ButtonGroup>
              <Button padding={0} onClick={editPostHandler}>
                <Icon as={FiEdit}></Icon>
              </Button>
              <Button padding={0} onClick={deletePostHandler}>
                <Icon as={AiOutlineDelete}></Icon>
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Flex>

      <Box marginTop="2">
        <Text noOfLines={3}>{body}</Text>
      </Box>
    </Flex>
  );
}

export default PostPreview;
