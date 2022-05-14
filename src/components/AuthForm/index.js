import styles from "./AuthForm.module.css";
import { Box } from "@chakra-ui/react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

function AuthForm() {
  return (
    <div className={styles.container}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        minWidth="450px"
        maxWidth="2000px"
        marginTop="8rem"
      >
        {/* <LoginForm styles={styles.form} /> */}
        <RegisterForm styles={styles.form} />

      </Box>
    </div>
  );
}

export default AuthForm;
