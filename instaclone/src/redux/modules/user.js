
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/api";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

const SET_USER = "user/SET_USER";
const LOG_OUT = "LOG_OUT";


// action create function
const setUSER = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

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
            token : res.data.token
          })
        );
        history.push("/");
        console.log(res.data.token);
        const accessToken = "Bearer " + res.data.token;
        setCookie("is_login", `${accessToken}`);
      });
  };

const loginCheckDB =
    () =>
        async (dispatch, getState, {history}) => {
            const token = getCookie("is_login");
            await api.get("").then((res) => {
                dispatch(
                    setUSER({
                        token: token,
                        createdAt: res.data.user.createdAt,
                        nickname: res.data.user.nickname,
                    })
                );
            });
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
                draft.is_login = true;
            }),
        [LOG_OUT]: (state, action) =>
            produce(state, (draft) => {
                deleteCookie("is_login");
                draft.user = {};
                draft.is_login = false;
            }),
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
