import React from "react";
import styled from "styled-components";
import style from "../assets/css/style.css";
import { Input, Button, Footer } from "../elements";
import Navbar from "../components/Navbar";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    dispatch(userActions.loginDB(email, password));
  };

  

  return (
    <React.Fragment>
      <Navbar />
      <div id="wrapper">
        <div className="container">
          <div className="form-data">
            <Form>
              <div className="logo">
                <img src="img/logo.png" alt="logo" />
              </div>

              <Input
                type="text"
                value={email}
                placeholder="이메일"
                _onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <Input
                type="password"
                value={password}
                placeholder="비밀번호"
                _onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button text="로그인" _onClick={login} />

              <span className="has-separator">또는</span>
              <a className="facebook-login">
                <i className="fab fa-facebook-square"></i> Facebook으로 로그인
              </a>
              <a className="password-reset">비밀번호를 잊으셨나요?</a>
              <div className="sign-up">
                계정이 없으신가요?{" "}
                <a onClick={() => history.push("/register")}>가입하기</a>
              </div>
            </Form>

            <div className="get-the-app">
              <span>앱을 다운로드하세요.</span>
              <div className="badges">
                <img src="img/app-store.png" />
                <img src="img/google-play.png" alt="google-play badge" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const Form = styled.div`
  background-color: #fff;
  border: 2px solid #eee;
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  text-align: center;
`;

export default Login;
