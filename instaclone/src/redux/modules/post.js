import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/api";

//
// import {firestore, storage} from "../../shared/firebase";
import moment from "moment"
import { actionCreators as imageActions } from "./image"

// action type
const GET_POST = "GET_POST"
const GET_POSTDETAIL = "GET_POSTDETAIL"
const ADD_POST = "ADD_POST"
const DELETE_POST = "DELETE_POST"
const UPDATE_LIKE = "UPDATE_LIKE"
const LOADING = "LOADING"

// action create function
const getPost = createAction(GET_POST, (post_list, is_next) => ({
  post_list,
  is_next,
}))
const getPostDetail = createAction(GET_POSTDETAIL, (postData, postId) => ({
  postData,
  postId,
}))
const updateLike = createAction(UPDATE_LIKE, (post_like) => ({ post_like }))
const addPost = createAction(ADD_POST, (post) => ({ post }))
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

// initialState
const initialState = {
  list: [],
  post_list: [],
  postData: {},
  is_loading: false,
  is_next: 0,
}

const initialPost = {
  // id: 0,
  // user_info: {
  //     user_name: "jihun",
  //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  // },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "",
  // comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM_DD hh:mm:ss"),
}

// thunk
const getPostMD = ({ start, next }) => {
  return function (dispatch, getState, { history }) {
    console.log(start, next)

    api
      .get("/post/postList")
      .then((res) => {
        const date = (a, b) => {
          let dateA = new Date(a[res.data.postingDate]).getTime()
          let dateB = new Date(b[res.data.postingDate]).getTime()
          return dateA > dateB ? 1 : -1
        }

        const res_length = res.data.length

        const date_sorting = res.data.sort(date)
        const scrollData = date_sorting.slice(start, next)

        dispatch(getPost(scrollData, res_length))
      })
      .catch((err) => console.log("get 포스트 에러", err))
  }
}

const updateLikeMd = ({ user_id, like }) => {
  return function (dispath, getState, { history }) {
    console.log(like, user_id)
    api
      .post(`http://localhost:3002/postList/like`, { user_id: { like } })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log("좋아요 업데이트 에러", err))
  }
}

const getPostDetailDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/posts/${postId}`)
      .then((res) => {
        dispatch(getPostDetail(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const deletePostDB =
  (postId) =>
  (dispatch, getState, { history }) => {
    api
      .delete(`/posts/${postId}`)
      .then((res) => history.replace("/"), dispatch(deletePost(postId)))
      .catch((err) => console.log(err))
  }

const addPostDB = () => {
  return function (dispatch, getState, { history }) {
    api
      .post(`/post/posting`, JSON.stringify())
      .then((res) => {
        // dispatch(addWork(content));
        console.log(res.data);
        history.push("/");
        dispatch(imageActions.setPreview(null));
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.replace("/");
  };
};

const ImgDB = () => async() => {
  await api.post()
}

const toggleLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    api
      .patch(`/posts/${postId}`, { id: postId })
      .catch((err) => console.log(err))
  }
}



// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post_list = action.payload.post_list
        draft.is_next = action.payload.is_next
      }),
    [UPDATE_LIKE]: (state, action) => produce(state, (draft) => {}),
    [GET_POSTDETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.postData = action.payload.postData
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.push(action.payload.post);
        }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((c) => c.id === action.payload.id)
        if (idx !== -1) {
          draft.list.splice(idx, 1)
        }
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading
      }),
  },
  initialState
)

const actionsCreators = {
  getPost,
  getPostMD,
  updateLikeMd,
  updateLike,
  getPostDetailDB,
  toggleLikeDB,
  deletePostDB,
  addPostDB
};

export {actionsCreators};