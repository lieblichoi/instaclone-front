import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { InfinityScroll } from "../components/InfinityScroll"
import Post from "../components/Post"
import { Grid } from "../elements"
import { actionsCreators as postActions } from "../redux/modules/post"

const PostList = (props) => {
  const dispatch = useDispatch()
  const is_loading = useSelector((state) => state.post.is_loading)
  const post_list = useSelector((state) => state.post.post_list)
  const comment_list = useSelector((state) => state.comment.comment_list)
  const post_length = useSelector((state) => state.post.is_next)
  const [view, setView] = useState({
    start: 0,
    next: 2,
  })

  console.log(post_length)
  useEffect(() => {
    dispatch(postActions.getPostMD(view))
  }, [comment_list, view])

  // console.log(is_loading, "isloading")
  return (
    <InfinityScroll
      callNext={() => {
          setView({
            start: view.start,
            next: (view.next += 2),
          })
        }
      }
      is_next={post_length > view.next }
      loading={is_loading}
    >
      <Grid padding="50px 0px 10px">
        <Post post_list={post_list} />
      </Grid>
    </InfinityScroll>
  )
}

export default PostList
