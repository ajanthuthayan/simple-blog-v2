import Head from "next/head";
import Nav from "../../src/components/Nav";
import Post from "../../src/components/Post";

// Imports for backend
import connectMongo from "../../utils/connectMongo";
import PostModel from "../../models/postModel";

export default function PostPage({ post }) {
  const { _id, author, date, title, body } = post;

  const transformedDate = new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const transformedPost = { _id, author, date: transformedDate, title, body };

  return (
    <>
      <Head>
        <title>Simple Blog - Post</title>
        <meta name="description" content="A Simple NextJS Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Post post={transformedPost} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const postId = context.params.postId;
  try {
    await connectMongo();
    const post = await PostModel.findById(postId, "_id author date title body");
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
