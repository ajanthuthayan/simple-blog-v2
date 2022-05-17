import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

function RegisterForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [cPasswordInput, setCPasswordInput] = useState("");

  const [firstNameIsTouched, setFirstNameIsTouched] = useState("");
  const [lastNameIsTouched, setLastNameIsTouched] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [cPasswordIsTouched, setCPasswordIsTouched] = useState(false);

  const [firstNameIsValid, setFirstNameIsValid] = useState("");
  const [lastNameIsValid, setLastNameIsValid] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [passwordIsValid, setPasswordIsValid] = useState(null);
  const [cPasswordIsValid, setCPasswordIsValid] = useState(null);

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [formIsValid, setFormIsValid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [successfulRegister, setSuccessfulRegister] = useState(null);

  const notAllowedSpecialCharacters = [
    "`",
    "~",
    " ",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "{",
    "]",
    "}",
    '""',
    "|",
    ";",
    ":",
    "'",
    '"',
    "<",
    ",",
    ">",
    ".",
    "/",
    "?",
  ];

  const createUser = async () => {
    try {
      const response = await fetch("/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstNameInput} ${lastNameInput}`,
          email: emailInput,
          password: passwordInput,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      return Promise.reject("An Error Occurred");
    }
  };

  useEffect(() => {
    const checkForPasswordMatch = () => {
      if (passwordInput === cPasswordInput) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    };
    setSuccessfulRegister(null);
    checkForPasswordMatch();

    if (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      cPasswordIsValid &&
      passwordsMatch
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    passwordInput,
    cPasswordInput,
    firstNameIsValid,
    lastNameIsValid,
    emailIsValid,
    passwordIsValid,
    cPasswordIsValid,
    passwordsMatch,
  ]);

  // onChange Handlers

  const firstNameChangeHandler = (event) => {
    const firstNameInput = event.target.value;
    setFirstNameInput(firstNameInput);

    let containsSpecialCharacters = notAllowedSpecialCharacters.filter((item) =>
      firstNameInput.includes(item)
    );

    if (
      firstNameIsTouched &&
      firstNameInput.length > 0 &&
      containsSpecialCharacters.length === 0
    ) {
      setFirstNameIsValid(true);
    } else {
      setFirstNameIsValid(false);
    }
  };

  const lastNameChangeHandler = (event) => {
    const lastNameInput = event.target.value;
    setLastNameInput(lastNameInput);

    let containsSpecialCharacters = notAllowedSpecialCharacters.filter((item) =>
      lastNameInput.includes(item)
    );

    if (
      lastNameIsTouched &&
      lastNameInput.length > 0 &&
      containsSpecialCharacters.length === 0
    ) {
      setLastNameIsValid(true);
    } else {
      setLastNameIsValid(false);
    }
  };

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
    if (passwordIsTouched && passwordInput.length >= 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const cPasswordChangeHandler = (event) => {
    const cPasswordInput = event.target.value;
    setCPasswordInput(cPasswordInput);
    if (cPasswordIsTouched && cPasswordInput.length >= 5) {
      setCPasswordIsValid(true);
    } else {
      setCPasswordIsValid(false);
    }
  };

  // onFocus Handlers
  const firstNameFocusHandler = () => setFirstNameIsTouched(true);
  const lastNameFocusHandler = () => setLastNameIsTouched(true);
  const emailFocusHandler = () => setEmailIsTouched(true);
  const passwordFocusHandler = () => setPasswordIsTouched(true);
  const cPasswordFocusHandler = () => setCPasswordIsTouched(true);

  const registerHandler = (event) => {
    event.preventDefault();
    setSuccessfulRegister(null);
    if (formIsValid) {
      setIsLoading(true);

      setTimeout(async () => {
        try {
          await createUser();
          setSuccessfulRegister(true);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setSuccessfulRegister(false);
        }
      }, 1000);
    }
  };
  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const showCPasswordHandler = () => {
    setShowCPassword((prevState) => !prevState);
  };

  const submissionMessage =
    successfulRegister === true ? (
      <Box>
        <Alert status="success" variant="solid">
          <AlertIcon />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>User successfully registered.</AlertDescription>
        </Alert>
      </Box>
    ) : successfulRegister === false ? (
      <Box>
        <Alert status="error" variant="solid">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Unable to register user.</AlertDescription>
        </Alert>
      </Box>
    ) : (
      ""
    );

  return (
    <>
      <FormControl
        className={props.styles}
        isRequired
        isInvalid={formIsValid === false && true}
        autoComplete="off"
      >
        <Heading as="h2" size="xl" paddingBottom="0.5rem" isTruncated>
          Sign Up
        </Heading>

        <FormLabel htmlFor="fname">First Name</FormLabel>
        <InputGroup>
          <Input
            isInvalid={firstNameIsTouched && !firstNameIsValid ? true : false}
            id="fname"
            type="text"
            value={firstNameInput}
            onChange={firstNameChangeHandler}
            onFocus={firstNameFocusHandler}
            variant={firstNameInput.length > 0 ? "filled" : "outline"}
          />
        </InputGroup>

        <FormLabel htmlFor="lName">Last Name</FormLabel>
        <InputGroup>
          <Input
            isInvalid={lastNameIsTouched && !lastNameIsValid ? true : false}
            id="lName"
            type="text"
            value={lastNameInput}
            onChange={lastNameChangeHandler}
            onFocus={lastNameFocusHandler}
            variant={lastNameInput.length > 0 ? "filled" : "outline"}
          />
        </InputGroup>

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
        </InputGroup>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputLeftElement>
            {passwordIsTouched && (!passwordIsValid || !passwordsMatch) && (
              <CloseIcon color="red.500" />
            )}

            {passwordIsTouched && passwordIsValid && passwordsMatch && (
              <CheckIcon color="green.500" />
            )}
          </InputLeftElement>
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

        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <InputGroup>
          <InputLeftElement>
            {cPasswordIsTouched && (!cPasswordIsValid || !passwordsMatch) && (
              <CloseIcon color="red.500" />
            )}

            {cPasswordIsTouched && cPasswordIsValid && passwordsMatch && (
              <CheckIcon color="green.500" />
            )}
          </InputLeftElement>
          <Input
            isInvalid={cPasswordIsTouched && !cPasswordIsValid ? true : false}
            id="confirm-password"
            type={showCPassword ? "text" : "password"}
            value={cPasswordInput}
            onChange={cPasswordChangeHandler}
            onFocus={cPasswordFocusHandler}
            variant={passwordInput.length > 0 ? "filled" : "outline"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showCPasswordHandler}>
              {showCPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          isLoading={isLoading ? true : false}
          loadingText={isLoading && "Submitting"}
          isDisabled={formIsValid ? false : true}
          mt={4}
          colorScheme="teal"
          type="submit"
          width={"100%"}
          onClick={registerHandler}
        >
          Register
        </Button>
        <Box marginTop={2} textAlign="center">
          <NextLink href="/login" passHref>
            <Link>
              <Text fontSize="xs">Already have an account? Login here.</Text>
            </Link>
          </NextLink>
        </Box>
      </FormControl>
      {submissionMessage}
    </>
  );
}

export default RegisterForm;
