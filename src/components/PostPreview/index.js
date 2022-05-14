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
import { ExternalLinkIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

function PostPreview(props) {
  const { id, author, date, title, body } = props;

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
        <Link href="/" isExternal noOfLines={0.8}>
          <Heading as="h4" size="md" display="inline" >
            {title}
          </Heading>
          <ExternalLinkIcon mx="2px" display="inline" />
        </Link>
      </Box>

      <Text noOfLines={3}>{body}</Text>
    </Box>
  );
}

export default PostPreview;
