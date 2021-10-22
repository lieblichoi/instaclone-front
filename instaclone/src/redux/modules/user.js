
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { produce } from "immer";
import { api } from "../../shared/api";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

const SET_USER = "user/SET_USER";
const LOG_OUT = "LOG_OUT";
const LOG_CHK = "LOG_CHK";


// action create function
const setUSER = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const logChk = createAction(LOG_CHK, (user) => ({user}));

const initialState = {
    user: {},
    is_login: false,
};

// Middleware
const loginDB =
  (setEmail, setPassword) =>
  async (dispatch, getState, { history }) => {
    console.log(setEmail, setPassword);
    
    await api
    
      .post(`/user/auth`, {
        userEmail: setEmail,
        userPassword: setPassword,
      })
      .then((res) => {
        console.log(res);
        dispatch(
          setUSER({
            token : res.data.token,
            userNickname : res.data.userNickname
          })
        );
        window.location.replace("/");
        console.log(res.data.token);
        console.log(res.data.userNickname);
        const accessToken = res.data.token;
        setCookie("is_login", `${accessToken}`);
        localStorage.setItem("author", res.data.userNickname);
      });
  };

  const loginCheckDB = () => {
    return function (dispatch, getState, { history }) {
      const token = getCookie("is_login");
      console.log(token);
      axios({
        method: "post",
        url: "http://13.209.72.212/user/chkLogin",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => { 
          dispatch(
            setUSER({
              email: res.data.email,
              nickname: res.data.nickname,
            })
          );
        })
        .catch((error) => {
          console.log(error.code, error.message);
        });
    };
  };

const signupDB =
    (setEmail, setNickname, setPassword) =>
        async (dispatch, getState, {history}) => {
            console.log(setEmail, setNickname, setPassword);
            await api
                .post(`/user/register`, {
                    userEmail: setEmail,
                    userNickname: setNickname,
                    userPassword: setPassword,
                })
                .then((res) => {
                    console.log(res);
                    history.push("/login");
                })
                .catch((err) => {
                    console.log(err);
                });
        };

const logOutDB = () => {
    return function (dispatch, getState, {history}) {
        dispatch(logOut());
        window.alert("로그아웃 되었습니다.");
        history.replace("/login");
    };
};

// Reducer
export default handleActions(
    {
        [SET_USER]: (state, action) =>
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.is_login = false;
            }),
        [LOG_OUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("is_login");
                draft.user = {};
                draft.is_login = false;
            }),
        [LOG_CHK]: (state, action) => {
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.is_login = true;
            })
        }
        
    },
    initialState
);

const actionCreators = {
    loginDB,
    loginCheckDB,
    signupDB,
    logOutDB,
};

export {actionCreators};
