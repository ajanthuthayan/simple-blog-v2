import styles from "./AddPostForm.module.css";
import { useState } from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Box,
  FormControl,
  Heading,
  FormLabel,
  InputGroup,
  Input,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [titleIsValid, setTitleIsValid] = useState(false);

  const [body, setBody] = useState("");
  const [bodyLength, setBodyLength] = useState(0);
  const [bodyIsValid, setBodyIsValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(null);

  const { data: session } = useSession();

  const onTitleChange = (event) => {
    // titleLength looks for max characters including spaces
    setTitleLength(event.target.value.length);

    const title = event.target.value;
    setTitle(title);

    // Check for length of title without spaces in front and at the end
    if (title.trim().length >= 1 && title.trim().length <= 100) {
      setTitleIsValid(true);
    } else {
      setTitleIsValid(false);
    }
  };

  const onBodyChange = (event) => {
    // bodyLength looks for max characters including spaces
    setBodyLength(event.target.value.length);

    const body = event.target.value;
    setBody(body);

    if (body.trim().length >= 1 && body.trim().length <= 1250) {
      setBodyIsValid(true);
    } else {
      setBodyIsValid(false);
    }
  };

  const createPost = async () => {
    try {
      const response = await fetch("/api/user/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: session.user.name,
          date: new Date(),
          title: title,
          body: body,
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

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSuccessful(null);

    if (titleIsValid && bodyIsValid) {
      setIsLoading(true);
      (async function () {
        try {
          await createPost();
          setIsLoading(false);
          setIsSuccessful(true);

          // Reset
          setTitle("");
          setTitleLength(0);
          setTitleIsValid(false);

          setBody("");
          setBodyLength(0);
          setBodyIsValid(false);
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
        maxWidth="1800px"
        marginTop="4rem"
        marginBottom="4rem"
      >
        <FormControl className={styles.form} isRequired>
          <Heading as="h2" size="xl" isTruncated>
            New Post
          </Heading>
          <FormLabel htmlFor="title">Title</FormLabel>
          <InputGroup
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Input
              id="title"
              type="text"
              width="100%"
              value={title}
              onChange={onTitleChange}
              maxLength="100"
              pattern="^[^\s]+(\s+[^\s]+)*$"
            />
            <Text
              fontSize="sm"
              color={titleLength === 100 && "red.500"}
            >{`${titleLength}/100`}</Text>
          </InputGroup>
          <FormLabel htmlFor="body">Body</FormLabel>
          <InputGroup
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
          >
            <Textarea
              id="body"
              type="body"
              width="100%"
              value={body}
              height="20rem"
              resize="none"
              onChange={onBodyChange}
              maxLength="1250"
            ></Textarea>
            <Text
              fontSize="sm"
              color={bodyLength === 1250 && "red.500"}
            >{`${bodyLength}/1250`}</Text>
          </InputGroup>
          <Button
            isDisabled={titleIsValid && bodyIsValid ? false : true}
            colorScheme="teal"
            type="submit"
            width="100%"
            marginTop="2rem"
            isLoading={isLoading ? true : false}
            loadingText="Submitting"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
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
              Thanks for submitting your post.
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
              We were unable to submit your post.
            </AlertDescription>
          </Alert>
        </Box>
      )}
    </div>
  );
}

export default AddPostForm;
