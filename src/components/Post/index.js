import styles from "./Post.module.css";
import { Box } from "@chakra-ui/react";

function Post() {
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
          Hello
      </Box>
    </div>
  );
}

export default Post;
