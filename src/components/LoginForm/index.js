import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/auth-slice";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { useSession, signIn } from "next-auth/react";

function LoginForm(props) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const findUser = async () => {
    try {
      const response = await signIn("credentials", {
        email: emailInput,
        password: passwordInput,
        redirect: false,
      });

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      return Promise.reject("An Error Occurred");
    }
  };

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
    if (passwordIsTouched && passwordInput.length >= 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  // onFocus Handlers
  const emailFocusHandler = () => setEmailIsTouched(true);
  const passwordFocusHandler = () => setPasswordIsTouched(true);

  const loginHandler = () => {
    setSuccessfulLogin(null);
    setIsLoading(true);
    if (emailIsValid && passwordIsValid) {
      setTimeout(async () => {
        try {
          await findUser();
          setIsLoading(false);
          router.push("/");
          setTimeout(() => {
            dispatch(login());
          }, 500);
        } catch (error) {
          setIsLoading(false);
          setSuccessfulLogin(false);
        }
      }, 1000);
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <>
      <FormControl
        className={props.styles}
        isRequired
        isInvalid={emailIsValid && passwordIsValid ? false : true}
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
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            isInvalid={passwordIsTouched && !passwordIsValid ? true : false}
            id="password"
            type={showPassword ? "text" : "password"}
            value={passwordInput}
            onChange={passwordChangeHandler}
            onFocus={passwordFocusHandler}
            variant={passwordInput.length > 0 ? "filled" : "outline"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showPasswordHandler}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          isDisabled={emailIsValid && passwordIsValid ? false : true}
          isLoading={isLoading ? true : false}
          loadingText="Signing In..."
          mt={4}
          colorScheme="teal"
          type="submit"
          width={"100%"}
          onClick={loginHandler}
        >
          Login
        </Button>
        <Box marginTop={2} textAlign="center">
          <NextLink href="/register" passHref>
            <Link>
              <Text fontSize="xs">
                Don&apos;t have an account? Register here.
              </Text>
            </Link>
          </NextLink>
        </Box>
      </FormControl>
      {successfulLogin === false && (
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
