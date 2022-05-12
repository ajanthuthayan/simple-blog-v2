import { useState } from "react";
import styles from "./AuthForm.module.css";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";

function AuthForm() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(null);

  // onChange Handlers
  const emailChangeHandler = (event) => {
    const emailInput = event.target.value;
    setEmailInput(emailInput);
    if (
      emailIsTouched &&
      emailInput.includes("@") &&
      emailInput.includes(".")
    ) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };
  const passwordChangeHandler = (event) => {
    const passwordInput = event.target.value;
    setPasswordInput(passwordInput);
    if (passwordIsTouched && passwordInput.length > 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  // onFocus Handlers
  const emailFocusHandler = () => setEmailIsTouched(true);
  const passwordFocusHandler = () => setPasswordIsTouched(true);

  const loginHandler = () => {
    if (emailIsValid && passwordIsValid) {
      setIsSubmitted(true);
    }
    setSuccessfulLogin(true);
  };

  return (
    <div className={styles.container}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        maxWidth={"500px"}
        width={"60vw"}
        minWidth={"400px"}
      >
        <FormControl className={styles.form} isRequired>
          <Heading as="h2" size="xl" paddingBottom="0.5rem" isTruncated>
            Sign In
          </Heading>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <InputGroup>
            <Input
              isInvalid={emailIsTouched && !emailIsValid ? true : false}
              id="email"
              type="email"
              value={emailInput}
              onChange={emailChangeHandler}
              onFocus={emailFocusHandler}
              variant={emailInput.length > 0 ? "filled" : "outline"}
            />
            <InputRightElement>
              {emailIsTouched && !emailIsValid && <CloseIcon color="red.500" />}
              {emailIsTouched && emailIsValid && (
                <CheckIcon color="green.500" />
              )}
            </InputRightElement>
          </InputGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              isInvalid={passwordIsTouched && !passwordIsValid ? true : false}
              id="password"
              type="password"
              value={passwordInput}
              onChange={passwordChangeHandler}
              onFocus={passwordFocusHandler}
              variant={passwordInput.length > 0 ? "filled" : "outline"}
            />
            <InputRightElement>
              {passwordIsTouched && !passwordIsValid && (
                <CloseIcon color="red.500" />
              )}

              {passwordIsTouched && passwordIsValid && (
                <CheckIcon color="green.500" />
              )}
            </InputRightElement>
          </InputGroup>

          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={loginHandler}
          >
            Login
          </Button>
        </FormControl>
        {isSubmitted && successfulLogin && (
          <Box>
            <Alert status="success" variant="solid">
              <AlertIcon />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Logging In...</AlertDescription>
            </Alert>
          </Box>
        )}
        {isSubmitted && !successfulLogin && (
          <Box>
            <Alert status="error" variant="solid">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>Invalid Credentials.</AlertDescription>
            </Alert>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default AuthForm;
