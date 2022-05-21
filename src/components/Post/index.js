import { useState } from "react";
import styles from "./Post.module.css";
import NextLink from "next/link";
import HomeIcon from "../HomeIcon";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

function Post(props) {
  const { _id: postid, author, date, title, body, authorized } = props.post;
  const router = useRouter();

  const [edittingMode, setEdittingMode] = useState(authorized && router.query.edit ? true : false);

  const [editTitle, setEditTitle] = useState(title);
  const [editTitleLength, setEditTitleLength] = useState(title.length);
  const [editTitleIsValid, setEditTitleIsValid] = useState(true);

  const [editBody, setEditBody] = useState(body);
  const [editBodyLength, setEditBodyLength] = useState(body.length);
  const [editBodyIsValid, setEditBodyIsValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(null);


  const toggleEditPost = async () => {
    // Reset edit title to original state
    setEditTitle(title);
    setEditTitleLength(title.length);
    setEditTitleIsValid(true);
    // Reset edit body to original state
    setEditBody(body);
    setEditBodyLength(body.length);
    setEditBodyIsValid(true);
    // Toggle editting mode state
    setEdittingMode((prevState) => !prevState);
  };

  const updatePost = async () => {
    try {
      const response = await fetch("/api/user/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postid,
          date: date,
          title: editTitle,
          body: editBody,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }
      return Promise.resolve("Success");
    } catch (error) {
      return Promise.reject("An Error Occurred");
    }
  };

  const deletePostHandler = async () => {
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

  const onEditTitleChange = (event) => {
    // titleLength looks for max characters including spaces
    setEditTitleLength(event.target.value.length);

    const title = event.target.value;
    setEditTitle(title);

    // Check for length of title without spaces in front and at the end
    if (title.trim().length >= 1 && title.trim().length <= 100) {
      setEditTitleIsValid(true);
    } else {
      setEditTitleIsValid(false);
    }
  };

  const onEditBodyChange = (event) => {
    // bodyLength looks for max characters including spaces
    setEditBodyLength(event.target.value.length);

    const body = event.target.value;
    setEditBody(body);

    if (body.trim().length >= 1 && body.trim().length <= 1250) {
      setEditBodyIsValid(true);
    } else {
      setEditBodyIsValid(false);
    }
  };

  const updatePostHandler = (event) => {
    console.log("clicked");
    event.preventDefault();
    setIsSuccessful(null);

    if (editTitleIsValid && editBodyIsValid) {
      setIsLoading(true);
      (async function () {
        try {
          await updatePost();
          setIsLoading(false);
          setIsSuccessful(true);

          // Reset
          setEditTitle("");
          setEditTitleLength(0);
          setEditTitleIsValid(false);

          setEditBody("");
          setEditBodyLength(0);
          setEditBodyIsValid(false);
          // Change to not editting mode
          setEdittingMode(false);
          router.reload();
        } catch (error) {
          setIsSuccessful(false);
        }
      })();
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
        {authorized && !edittingMode && (
          <Flex justifyContent="flex-end">
            <ButtonGroup>
              <Button colorScheme="gray" size="xs" onClick={toggleEditPost}>
                EDIT
              </Button>
              <Button colorScheme="red" size="xs" onClick={deletePostHandler}>
                DELETE
              </Button>
            </ButtonGroup>
          </Flex>
        )}
        {edittingMode ? (
          <Box>
            <Editable defaultValue={title} fontSize="4xl" fontWeight="700">
              <EditablePreview padding="0" margin="0" />
              <EditableInput
                id="edittitle"
                type="text"
                width="100%"
                value={editTitle}
                resize="none"
                onChange={onEditTitleChange}
                maxLength="100"
                padding="0"
                margin="0"
                pattern="^[^\s]+(\s+[^\s]+)*$"
              />
            </Editable>
            <Text
              fontSize="sm"
              textAlign="right"
              color={editTitleLength === 100 && "red.500"}
            >{`${editTitleLength}/100`}</Text>
            <Text>{date}</Text>
            <Text>{author}</Text>
            <br />
            <Editable defaultValue={body}>
              <EditablePreview />
              <EditableTextarea
                id="editbody"
                type="text"
                width="100%"
                value={editBody}
                height="20rem"
                resize="none"
                onChange={onEditBodyChange}
                maxLength="1250"
              />
            </Editable>
            <Text
              fontSize="sm"
              textAlign="right"
              color={editBodyLength === 1250 && "red.500"}
            >{`${editBodyLength}/1250`}</Text>
            <Button
              width="100%"
              colorScheme="green"
              marginTop="2"
              onClick={updatePostHandler}
            >
              Save Changes
            </Button>
            <Button
              width="100%"
              colorScheme="red"
              marginTop="2"
              onClick={toggleEditPost}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box>
            <Heading>{title}</Heading>
            <Text>{date}</Text>
            <Text>{author}</Text>
            <br />
            <Text>{body}</Text>
          </Box>
        )}
      </Box>
      {!edittingMode && (
        <NextLink href="/" passHref>
          <Button leftIcon={<HomeIcon />} _hover={{ bg: "teal.200" }}>
            <Heading as="h3" size="md">
              Return
            </Heading>
          </Button>
        </NextLink>
      )}

      {isSuccessful && (
        <Box
          overflow="hidden"
          minWidth="450px"
          width="80vw"
          maxWidth="1800px"
          marginTop="-3rem"
          marginBottom="4rem"
        >
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Success!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Your post has been updated with the latest changes.
            </AlertDescription>
          </Alert>
        </Box>
      )}
      {isSuccessful === false && (
        <Box
          overflow="hidden"
          minWidth="450px"
          width="80vw"
          maxWidth="1800px"
          marginTop="-3rem"
          marginBottom="4rem"
        >
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Error!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              We were unable to update your post.
            </AlertDescription>
          </Alert>
        </Box>
      )}
    </div>
  );
}

export default Post;
