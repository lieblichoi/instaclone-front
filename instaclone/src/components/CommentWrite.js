import React, { useState } from "react"
import { AiOutlineSmile } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Texts, Images, Buttons } from "../elements"
import { history } from "../redux/configStore"
import { actionsCreators as commentActions } from "../redux/modules/comment"
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import "dayjs/locale/ko"

export const CommentWrite = (props) => {
  const {
    postingComment,
    postingDate,
    postingAuthor,
    postID,
    _id,
    // postingTag,
    // __v,
  } = props.post

  const dispatch = useDispatch()
  const [text, setText] = useState("")
  const [content, setContent] = useState(false)

  // 댓글 모두보기 state 현재안씀
  const [comment, setComment] = useState(false)

  const get_comment = useSelector((state) => state.comment.comment_list)

  const post_info = get_comment.filter((post) => post.postID === postID)

  dayjs.extend(relativeTime)
  dayjs.locale("ko")

  return (
    <>
      {/* 아이콘 */}

      <div style={{ display: "flex", margin: "13px" }}>
        {/* {comment_cnt && comment_cnt.length > 8 ? comment_cnt.slice(0, 8), "...more" : ""} */}

        <Texts bold>{postingAuthor}</Texts>
        <Buttons
          padding="0px 10px"
          _onClick={() => {
            setContent(!content)
          }}
        >
          <Texts> ...더보기</Texts>
        </Buttons>
      </div>

      {/* 게시글 내용 보이기 사용안함 */}
      {content ? (
        <div style={{ margin: "13px" }}>
          <Texts>{postingComment}</Texts>
        </div>
      ) : (
        ""
      )}

      {/* 같은 아이디끼리 묶어서 길이 */}
      <div style={{ margin: "13px" }}>
        <Buttons
          _onClick={() => {
            history.push("/post/1")
          }}
        >
          <Texts>댓글 {post_info.length}개 모두보기</Texts>
        </Buttons>
      </div>

      <div style={{ margin: "5px 13px" }}>
        <Texts size={12}>{dayjs(postingDate).fromNow()}</Texts>
      </div>

      {/* 사용안함 */}
      {comment ? (
        post_info.map((e) => {
          return (
            <div key={e._id} style={{ margin: "5px", display: "flex" }}>
              <Images profileImg src={props.user_Profile} size={20} />
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  margin: "8px 0",
                }}
              >
                <div style={{ marginRight: "5px" }}>
                  <Texts bold>{postingAuthor}</Texts>
                </div>
                {/* </div> */}
                <Texts>{e.replyComment}</Texts>
              </div>
            </div>
          )
        })
      ) : (
        // 여기 위까지 사용안함 아래만 사용
        <>
          <div style={{ margin: "5px", display: "flex" }}>
            {/* <div style={{ display: "flex", alignItems: "center" }}> */}
            <Images profileImg src={props.user_Profile} size={20} />
            <div
              style={{
                display: "flex",
                textAlign: "center",
                margin: "8px 0",
              }}
            >
              <div style={{ marginRight: "5px" }}>
                <Texts bold>{postingAuthor}</Texts>
              </div>
              {/* </div> */}
              {/* optional chaining "?" - 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있습니다*/}
              <Texts>{post_info[post_info.length - 1]?.replyComment}</Texts>
            </div>
          </div>
        </>
      )}

      {/* 댓글 작성 */}
      <div style={{ margin: "8px", display: "flex" }}>
        <AiOutlineSmile
          style={{
            width: "24px",
            height: "24px",
            padding: "5px 10px 5px 5px",
          }}
        />
        <input
          type="text"
          placeholder="댓글을 작성해주세요"
          value={text}
          style={{
            padding: "5px",
            boxSizing: "border-box",
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
          }}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <div
          style={{
            minWidth: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Buttons
            _onClick={() => {
              dispatch(
                commentActions.add_comment_md({
                  replyComment: text,
                  replyAuthor: postingAuthor,
                  postID: _id,
                  postingAuthor,
                })
              )
              setText("")
            }}
          >
            <Texts>게시</Texts>
          </Buttons>
        </div>
      </div>
    </>
  )
}

CommentWrite.defaultProps = {
  postingLike: "0",
  postingComment: "내용",
  postingComment_cnt: "0",
  postingDate: "0",
}