import { useState } from "react";
import styles from "./AuthForm.module.css";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

function AuthForm() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = true;

  return (
    <div className={styles.container}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <FormControl className={styles.form} isRequired>
          <Heading as="h2" size="xl" paddingBottom="0.5rem" isTruncated>
            Sign In
          </Heading>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            type="email"
            value={input}
            onChange={handleInputChange}
          />
          {/* {isError ? (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      ) : (
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      )} */}

          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="email" type="email" />
          <Button
            mt={4}
            colorScheme="teal"
            // isLoading={props.isSubmitting}
            type="submit"
            onClick={() => alert("Submitted!")}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default AuthForm;
