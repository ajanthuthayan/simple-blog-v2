import styles from "./PostPreview.module.css";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Spacer,
  Button,
} from "@chakra-ui/react";

function PostPreview(props) {
  const { id, title, body } = props;

  const property = {
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };
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
      <Box>
        <Link href={`/posts/${id}`} noOfLines={1}>
          <Heading as="h4" size="md" display="inline">
            {title}
          </Heading>
        </Link>
      </Box>

      <Text noOfLines={3}>{body}</Text>
    </Box>
  );
}

export default PostPreview;
