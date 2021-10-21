import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Texts, Images, Buttons } from "../elements"
import { useDispatch, useSelector } from "react-redux"
import { actionsCreators as postActions } from "../redux/modules/post"
import { CommentWrite } from "./CommentWrite"
import { actionsCreators as commentActions } from "../redux/modules/comment"
import { Icon } from "./Icon"

const Post = (props) => {
  const dispatch = useDispatch()
  const post_list = useSelector((state) => state.post.post_list)

  // console.log(document.documentElement.scrollTop, "asd")
  // console.log(document.documentElement.scrollHeight)
  useEffect(() => {
    dispatch(commentActions.get_comment_md())
    dispatch(postActions.getPostMD())
  }, [])

  return (
    <Container>
      {post_list.map((post, i) => {
        return (
          <PostContainer key={post._id}>
            <Grid>
              {/* <PostGrid> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Images profileImg src={props.user_Profile} />

                <Texts bold>{post.postingAuthor}</Texts>
              </div>
              {/* </PostGrid> */}
              <div style={{ margin: "0px 15px" }}>
                <button
                  style={{
                    padding: "10px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <Texts bold> ... </Texts>
                </button>
              </div>
            </Grid>

            {/* 게시물 사진 */}
            <Images src={props.postingImgUrl}></Images>

            {/* 아이콘 */}
            <Icon />

            {/* 댓글작성 컴포넌트*/}
            <CommentWrite post={post} />
          </PostContainer>
        )
      })}
    </Container>
  )
}

Post.defaultProps = {
  user_Profile: "https://www.codingfactory.net/wp-content/uploads/abc.jpg",
  postingAuthor: "jaeil",
  postingImgUrl: "https://www.codingfactory.net/wp-content/uploads/abc.jpg",
  postingLike: "0",
  postingComment: "내용",
  postingComment_cnt: "5",
  postingDate: "1",
}

const Grid = styled.div`
  display: flex;
  background-color: #fff;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border: none;
  align-items: center;
  justify-content: space-between;
`

const Container = styled.div`
  width: 100vw;
  background-color: #efefefdb;
  overflow-y: auto;
`

const PostContainer = styled.div`
  margin: 16px auto;
  border: 1px solid #0000001f;
  box-sizing: border-box;
  width: 80%;
  background-color: #ffffff;
  max-width: 350px;
`

export default Post;