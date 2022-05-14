import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
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

function RegisterForm(props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [formIsValid, setFormIsValid] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(null);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else if (emailIsValid === null && passwordIsValid === null) {
      setFormIsValid(null);
    } else if (
      (!emailIsValid && !passwordIsValid) ||
      !emailIsValid ||
      !passwordIsValid
    ) {
      setFormIsValid(false);
    }
  }, [emailIsValid, passwordIsValid]);

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
      setFormIsValid(true);
      setIsSubmitted(true);
      setSuccessfulLogin(true);
    } else if (emailIsValid || passwordIsValid) {
      setSuccessfulLogin(null);
    } else {
      setFormIsValid(false);
    }
  };
  return (
    <>
      <FormControl
        className={props.styles}
        isRequired
        isInvalid={formIsValid === false && true}
      >
        <Heading as="h2" size="xl" paddingBottom="0.5rem" isTruncated>
          Sign Up
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
            {emailIsTouched && emailIsValid && <CheckIcon color="green.500" />}
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
        <FormErrorMessage>
          Please fill all required fields before submitting.
        </FormErrorMessage>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          width={"100%"}
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
            <AlertDescription>Registering User...</AlertDescription>
          </Alert>
        </Box>
      )}
      {isSubmitted && successfulLogin === false && (
        <Box>
          <Alert status="error" variant="solid">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>Unable to register user...</AlertDescription>
          </Alert>
        </Box>
      )}
    </>
  );
}

export default RegisterForm;
