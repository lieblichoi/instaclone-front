import React from "react";
import Post from "../components/Post";
import { Grid } from "../elements";

const PostList = (props) => {
  return (
    <Grid padding="50px 0px 10px">
      <Post />
    </Grid>
  );
};

export default PostList;
