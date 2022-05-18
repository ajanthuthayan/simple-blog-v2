import styles from "./PostPreview.module.css";
import { Box, Heading, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";

function PostPreview(props) {
  const { id, title, body } = props;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="90vw"
      minWidth="400px"
      maxWidth="1000px"
      padding="2rem"
      className={styles["card-container"]}
    >
      <LinkBox as="article">
        <Box>
          <LinkOverlay href={`/posts/${id}`} noOfLines={1}>
            <Heading as="h4" size="md" display="inline">
              {title}
            </Heading>
          </LinkOverlay>
        </Box>

        <Text noOfLines={3}>{body}</Text>
      </LinkBox>
    </Box>
  );
}

export default PostPreview;
