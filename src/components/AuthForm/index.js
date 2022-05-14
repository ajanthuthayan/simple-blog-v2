import styles from "./AuthForm.module.css";
import { Box } from "@chakra-ui/react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

function AuthForm() {
  return (
    <div className={styles.container}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <LoginForm styles={styles.form} />
      </Box>
    </div>
  );
}

export default AuthForm;
