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
  Textarea,
  Button,
  Spacer,
} from "@chakra-ui/react";

function AddPostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSuccessful(false);
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
      >
        <FormControl className={styles.form} isRequired>
          <Heading as="h2" size="xl" isTruncated>
            New Post
          </Heading>
          <FormLabel htmlFor="title">Title</FormLabel>
          <InputGroup>
            <Input id="title" type="text" width="100%" />
          </InputGroup>
          <FormLabel htmlFor="body">Body</FormLabel>
          <InputGroup>
            <Textarea id="body" type="body" width="100%" resize="none" />
          </InputGroup>
          <Button
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
          marginTop="1rem"
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
          marginTop="1rem"
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
             Error
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
