import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { login } from "../../app/auth-slice";
import { useRouter } from "next/router";

function LoginForm(props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [formIsValid, setFormIsValid] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

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
  }, [emailIsValid, passwordIsValid, passwordInput]);

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
    // Avoid revealing how long the password must be, instead if it is greater than 0 it will be considered valid
    if (passwordIsTouched && passwordInput.length > 0) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  // onFocus Handlers
  const emailFocusHandler = () => setEmailIsTouched(true);
  const passwordFocusHandler = () => setPasswordIsTouched(true);

  const loginHandler = () => {
    setIsSubmitted(true);
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
      // If a valid response is found
      setSuccessfulLogin(true);
      setTimeout(() => {
        dispatch(login());
        router.push("/");
      }, 1000);
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
            variant={
              emailIsTouched &&
              emailInput.includes("@") &&
              emailInput.includes(".")
                ? "filled"
                : "outline"
            }
          />
        </InputGroup>
        {emailIsValid === false && (
          <FormHelperText color={"red.500"}>
            Enter a valid email address.
          </FormHelperText>
        )}
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
        </InputGroup>

        {isSubmitted && passwordInput.length < 1 && (
          <FormHelperText color={"red.500"}>Enter a password.</FormHelperText>
        )}

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
            <AlertDescription>Logging in...</AlertDescription>
          </Alert>
        </Box>
      )}
      {isSubmitted && successfulLogin === false && (
        <Box>
          <Alert status="error" variant="solid">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>Invalid user credentials.</AlertDescription>
          </Alert>
        </Box>
      )}
    </>
  );
}

export default LoginForm;
