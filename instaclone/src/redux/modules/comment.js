import axios from "axios"
import produce from "immer"
import { createAction, handleActions } from "redux-actions"

const ADD_COMMENT = "ADD_COMMENT"
const GET_COMMNET = "GET_COMMENT"

const add_comment = createAction(ADD_COMMENT, (comment) => ({ comment }))
// const get_comment = createAction(GET_COMMNET, (comment_list) => ({
//   comment_list,
// }))

const initialState = {
  comment_list: [],
}

const apiRef = axios.create({
  baseURL: "http://13.209.72.212",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
})

const add_comment_md = ({
  replyComment,
  replyAuthor,
  postID,
  postingAuthor,
}) => {
  return function (dispatch, getState, { history }) {
    apiRef
      .post(`/reply/replyPost/${postID}`, {
        replyAuthor,
        replyComment,
        postingAuthor,
      })
      .then((res) => {
        console.log(res)
        dispatch(add_comment({ replyAuthor, replyComment, postID }))
      })
      .catch((err) => console.log(err, "댓글작성에러"))
  }
}

// const get_comment_md = () => {
//   return function (dispatch, getState, { history }) {
//     const _post_id = getState().post.post_list

//     console.log(_post_id)

//     apiRef
//       .post(`/reply/replyList`)
//       .then((res) => {
//         dispatch(get_comment(res.data))
//       })
//       .catch((err) => console.log(err, "댓글 불러오기 에러"))
//   }
// }

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list.push(action.payload.comment)
      }),
    // [GET_COMMNET]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.comment_list = action.payload.comment_list
    //   }),
  },
  initialState
)

const actionsCreators = {
  add_comment,
  add_comment_md,
  // get_comment,
  // get_comment_md,
}

export { actionsCreators }